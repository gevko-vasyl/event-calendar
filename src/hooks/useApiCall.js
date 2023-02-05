import { useMemo, useState, useCallback } from 'react';
import { useAppContext } from '../context';

export const useApiCall = (url, method) => {
  const [response, setResponse] = useState(null);
  const { setIsLoading, setError } = useAppContext();

  const makeCall = useCallback(
    async data => {
      setIsLoading(true);

      try {
        const options = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            //TODO add authorization token
          },
        };

        if (data) {
          options.body = JSON.stringify(data);
        }

        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url, method],
  );

  return useMemo(() => ({ response, makeCall }), [response, makeCall]);
};
