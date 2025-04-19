import { useState, useEffect } from 'react';

function useSwitchState(key: string, defaultValue: boolean) {
  // Get the initial state from localStorage or use the default value
  const [isChecked, setIsChecked] = useState(() => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    }
    return defaultValue;
  });

  // Sync the state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(isChecked));
    }
  }, [isChecked, key]);

  return [isChecked, setIsChecked] as const;
}

export default useSwitchState;
