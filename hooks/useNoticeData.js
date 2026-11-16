import { useState, useEffect } from 'react';
import { DEFAULT_NOTICE_DATA } from '@/lib/constants';
import { parseNoticeToken } from '@/lib/token';

// In-memory cache to make page navigation and re-opens instantaneous (0ms)
const noticeCache = new Map();

export function useNoticeData(initialData = null, token = null) {
  const [data, setData] = useState(() => {
    let initial = {
      ...DEFAULT_NOTICE_DATA,
      ...(initialData || {})
    };
    if (token) {
      // 0. Check in-memory cache first (0 ms)
      if (noticeCache.has(token)) {
        return { ...initial, ...noticeCache.get(token) };
      }

      // 1. Instant check in local storage if opened on creator device
      if (typeof window !== 'undefined') {
        try {
          const localHistory = JSON.parse(localStorage.getItem('ajeer_notices_history') || '[]');
          const found = localHistory.find(item => item?.token === token || item?.noticeNumber === token);
          if (found) {
            noticeCache.set(token, found);
            return { ...initial, ...found };
          }
        } catch (e) {}
      }

      // 2. Parse token JWT claims
      try {
        const parsed = parseNoticeToken(token);
        if (parsed) {
          initial = { ...initial, ...parsed };
        }
      } catch (e) {
        console.warn("Initial token parse note:", e);
      }
    } else if (noticeCache.has('__root_notice__')) {
      return { ...initial, ...noticeCache.get('__root_notice__') };
    }
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    // 1. If we have token, fetch live record via fast Edge-cached API
    if (token) {
      if (noticeCache.has(token)) {
        const cached = noticeCache.get(token);
        setData(prev => ({ ...prev, ...cached }));
      }

      fetch(`/api/notices/${encodeURIComponent(token)}`)
        .then(res => res.json())
        .then(resData => {
          if (isCurrent && resData && resData.success && resData.data) {
            noticeCache.set(token, resData.data);
            setData(prev => ({ ...prev, ...resData.data }));
          } else if (typeof window !== 'undefined') {
            // Direct Firestore fallback only if API didn't have it
            import('@/lib/firestoreNotices')
              .then(({ getNoticeFromFirestore }) => getNoticeFromFirestore(token))
              .then((cloudNotice) => {
                if (isCurrent && cloudNotice) {
                  noticeCache.set(token, cloudNotice);
                  setData(prev => ({ ...prev, ...cloudNotice }));
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {
          // Direct client fallback on network error
          if (typeof window !== 'undefined') {
            import('@/lib/firestoreNotices')
              .then(({ getNoticeFromFirestore }) => getNoticeFromFirestore(token))
              .then((cloudNotice) => {
                if (isCurrent && cloudNotice) {
                  noticeCache.set(token, cloudNotice);
                  setData(prev => ({ ...prev, ...cloudNotice }));
                }
              })
              .catch(() => {});
          }
        });
    } else {
      // 2. Root main page
      if (noticeCache.has('__root_notice__')) {
        setData(prev => ({ ...prev, ...noticeCache.get('__root_notice__') }));
        return;
      }

      setLoading(true);
      fetch('/api/notices')
        .then(res => res.json())
        .then(resData => {
          if (isCurrent && resData && resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
            const activeNotice = resData.data.find(d => d.noticeNumber === "TQ6258541") || resData.data[0];
            if (activeNotice) {
              noticeCache.set('__root_notice__', activeNotice);
              setData(prev => ({ ...prev, ...activeNotice }));
            }
          }
        })
        .catch(err => {
          console.warn("API root fetch note:", err);
        })
        .finally(() => {
          if (isCurrent) setLoading(false);
        });
    }

    return () => {
      isCurrent = false;
    };
  }, [token]);

  // Set document title dynamically
  useEffect(() => {
    if (data?.pageTitle && typeof document !== 'undefined') {
      document.title = data.pageTitle;
    }
  }, [data?.pageTitle]);

  return { data, loading, error, setData };
}
