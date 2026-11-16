import { useState, useEffect } from 'react';
import { DEFAULT_ASSETS } from '@/lib/firestoreAssets';

// Global singleton cache so multiple components never fetch repeatedly
let cachedAssets = null;
let activeFetch = null;

export function useAppAssets() {
  const [assets, setAssets] = useState(() => cachedAssets || DEFAULT_ASSETS);
  const [loaded, setLoaded] = useState(() => !!cachedAssets);

  useEffect(() => {
    let isCurrent = true;

    if (cachedAssets) {
      setAssets(cachedAssets);
      setLoaded(true);
      return;
    }

    // 1. Check cached assets in browser storage for instant render
    try {
      const cached = sessionStorage.getItem('firebase_app_assets');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.ajeerLogo) {
          cachedAssets = parsed;
          setAssets(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch (e) {}

    // 2. Deduplicated fetch: only ONE fetch runs across all components
    if (!activeFetch) {
      activeFetch = fetch('/api/assets')
        .then(res => res.json())
        .then(json => {
          if (json && json.success && json.data) {
            cachedAssets = json.data;
            try {
              sessionStorage.setItem('firebase_app_assets', JSON.stringify(json.data));
            } catch (e) {}
            return json.data;
          }
          return DEFAULT_ASSETS;
        })
        .catch(err => {
          console.warn('Firebase assets fetch note:', err.message);
          return DEFAULT_ASSETS;
        })
        .finally(() => {
          activeFetch = null;
        });
    }

    activeFetch.then(data => {
      if (isCurrent && data) {
        setAssets(data);
        setLoaded(true);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { assets, loaded };
}
