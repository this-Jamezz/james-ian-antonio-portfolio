import { useEffect, useState } from 'react';

/**
 * Reactive `window.matchMedia`. The first render already reads the real value
 * (this app is client-only), so there is no flash of the wrong branch.
 *
 * @param {string} query any media query, e.g. '(hover: hover) and (pointer: fine)'
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}