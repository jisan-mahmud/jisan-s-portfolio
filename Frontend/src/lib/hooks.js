import { useEffect, useState } from 'react';
import { apiGet } from './api';

function useApi(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    apiGet(path)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load data');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path]);

  return { data, error, loading };
}

export function useHomeData() {
  return useApi('portfolio/home');
}

export function useProfile() {
  return useApi('portfolio/profile');
}
