import {useEffect, useState} from 'react';
import {useAuth} from '../providers/AuthContext';
import {fetchHelper} from '../utils/fetchHelper';
import {getFetchOptions} from '../utils/getFetchOptions';

export const useFetchWithAuth = <T>(url: string) => {
  const {authResult} = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (authResult?.accessToken) {
      const options: RequestInit = getFetchOptions(authResult?.accessToken);

      fetchHelper<T>(url, options, setLoading, setData, setError);
    }
  }, [
    authResult?.accessToken,
    url,
    getFetchOptions,
    setLoading,
    setData,
    setError,
  ]);

  return {data, loading, error};
};
