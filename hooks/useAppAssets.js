import { useState, useEffect } from 'react';
import { DEFAULT_ASSETS } from '@/lib/firestoreAssets';

export function useAppAssets() {
  const [assets, setAssets] = useState(DEFAULT_ASSETS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    // 1. Check cached assets in browser storage for instant render
    try {
      const cached = sessionStorage.getItem('firebase_app_assets');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.ajeerLogo) {
          setAssets(parsed);
          setLoaded(true);
        }
      }
    } catch (e) {}

    // 2. Fetch fresh assets from Firebase Firestore via API
    fetch('/api/assets')
      .then(res => res.json())
      .then(json => {
        if (isCurrent && json && json.success && json.data) {
          setAssets(json.data);
          setLoaded(true);
          try {
            sessionStorage.setItem('firebase_app_assets', JSON.stringify(json.data));
          } catch (e) {}
        }
      })
      .catch(err => {
        console.warn('Firebase assets fetch note:', err.message);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { assets, loaded };
}
