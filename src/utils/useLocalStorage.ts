'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export enum StorageKey {
  ANSWERS = 'ANSWERS',
}

export const useLocalStorage = <T>(key: StorageKey, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
