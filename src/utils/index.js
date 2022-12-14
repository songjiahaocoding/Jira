import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Reset timeout after the change of value or delay
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // Callback: clear the timeout after the previous useEffect being executed
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
