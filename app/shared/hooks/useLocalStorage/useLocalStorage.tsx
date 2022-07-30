import React from "react";
import { useDidMount } from "..";

export const useLocalStorage = <T,>(masterKey: string, initialData?: T) => {
  const handleGet = React.useCallback((key = masterKey): T | undefined => {
    try {
      const storedData = localStorage.getItem(key);

      return storedData ? JSON.parse(storedData) : undefined;
    } catch (err) {
      return undefined;
    }
  }, []);

  const handleSet = React.useCallback((data: T, key = masterKey) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {}
  }, []);

  useDidMount(() => {
    const storedData = handleGet();

    initialData && !storedData && handleSet(initialData);
  });

  return React.useMemo(
    () => ({
      get: handleGet,
      set: handleSet,
    }),
    [handleGet, handleSet]
  );
};
