import { useState, useEffect } from 'react';
import { DEFAULT_NOTICE_DATA } from '@/lib/constants';
import { parseNoticeToken } from '@/lib/token';

export function useNoticeData(initialData = null, token = null) {
  const [data, setData] = useState(() => {
    let initial = {
      ...DEFAULT_NOTICE_DATA,
      ...(initialData || {})
    };
    if (token) {
      try {
        const parsed = parseNoticeToken(token);
        if (parsed) {
          initial = { ...initial, ...parsed };
        }
      } catch (e) {
        console.warn("Initial token parse note:", e);
      }
    }
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. If we have token, immediately sync decoded data and fetch fresh data from Firebase
    if (token) {
      const parsed = parseNoticeToken(token);
      if (parsed) {
        setData(prev => ({ ...prev, ...parsed }));
      }

      fetch(`/api/notices/${encodeURIComponent(token)}`)
        .then(res => res.json())
        .then(resData => {
          if (resData && resData.success && resData.data) {
            setData(prev => ({ ...prev, ...resData.data }));
          }
        })
        .catch(err => {
          console.warn("API fetch error, using decoded token data:", err);
        });
    } else {
      // 2. If on root main page without token: fetch live notice directly from Firebase!
      setLoading(true);
      fetch('/api/notices')
        .then(res => res.json())
        .then(resData => {
          if (resData && resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
            // Find official notice (TQ6258541) or latest active notice from Firebase
            const activeNotice = resData.data.find(d => d.noticeNumber === "TQ6258541") || resData.data[0];
            if (activeNotice) {
              setData(prev => ({ ...prev, ...activeNotice }));
            }
          }
        })
        .catch(err => {
          console.warn("API root fetch note:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Set document title dynamically
  useEffect(() => {
    if (data?.pageTitle && typeof document !== 'undefined') {
      document.title = data.pageTitle;
    }
  }, [data?.pageTitle]);

  return { data, loading, error, setData };
}
