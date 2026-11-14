import { useState, useEffect } from 'react';
import { DEFAULT_NOTICE_DATA } from '@/lib/constants';
import { parseNoticeToken } from '@/lib/token';

export function useNoticeData(initialData = null, token = null) {
  const [data, setData] = useState(() => ({
    ...DEFAULT_NOTICE_DATA,
    ...(initialData || {})
  }));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have token, try to decode or fetch it
    if (token) {
      setLoading(true);

      // 1. Immediate client decode from token
      const parsed = parseNoticeToken(token);
      if (parsed) {
        setData(prev => ({ ...prev, ...parsed }));
      }

      // 2. Fetch latest saved data from API
      fetch(`/api/notices/${encodeURIComponent(token)}`)
        .then(res => res.json())
        .then(resData => {
          if (resData && resData.success && resData.data) {
            setData(prev => ({ ...prev, ...resData.data }));
          }
        })
        .catch(err => {
          console.warn("API fetch error, using decoded token data:", err);
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
