import { useState, useEffect } from 'react';

/**
 * Custom hook for loading content with error handling and loading state
 * @param {() => Promise<any>} loadFn - Function to load data
 * @returns {{ data: any, loading: boolean, error: Error | null }}
 */
export function useContentLoader(loadFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const result = await loadFn();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load data'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [loadFn]);

  return { data, loading, error };
}

/**
 * Custom hook for debounced value
 * @param {string} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {string} - Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for dark mode preference
 * @returns {{ isDark: boolean, toggle: () => void }}
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  const toggle = () => setIsDark(prev => !prev);

  return { isDark, toggle };
}
