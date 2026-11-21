import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'futureplan.v1.';

export function useStored<T>(key: string, initial: T) {
  const fullKey = PREFIX + key;
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(fullKey);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch {
      /* storage may be unavailable, the app still works for this session */
    }
  }, [fullKey, value]);

  return [value, setValue] as const;
}

export function useSectionHash(ids: string[], fallback: string) {
  const read = useCallback(() => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    return ids.includes(raw) ? raw : fallback;
  }, [ids, fallback]);

  const [active, setActive] = useState(read);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', `#${fallback}`);
    }
    const onHash = () => setActive(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [read, fallback]);

  const go = useCallback((id: string) => {
    window.history.pushState(null, '', `#${id}`);
    setActive(id);
  }, []);

  useEffect(() => {
    const onPop = () => setActive(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [read]);

  return [active, go] as const;
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#101613' : '#F7F4EE');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(PREFIX + 'theme', JSON.stringify(next));
      } catch {
        /* storage may be unavailable, the toggle still works for this session */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function scrollToTop(smooth = true) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: smooth && !reduced ? 'smooth' : 'auto' });
}

export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
