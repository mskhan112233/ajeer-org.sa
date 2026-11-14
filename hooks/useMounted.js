import { useState, useEffect } from 'react';

/**
 * Reusable hook to track client-side mounting
 * Prevents hydration mismatches between SSR and Client
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
