import { useState, useEffect } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string[] | undefined>();

  useEffect(() => {
    const defaultValue = [];
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue !== null ? JSON.parse(storedValue) : defaultValue);
    } else {
      setValue(defaultValue);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined" && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return { value, setValue };
};

export const useFavoriteStorage = (key: string) => {
  const { value, setValue } = useLocalStorage(key);

  const addId = (id: string) => {
    setValue((prevIds) => (prevIds ? [...prevIds, id] : [id]));
  };

  const removeId = (id: string) => {
    setValue((prevIds) => prevIds?.filter((prevId) => prevId !== id));
  };

  const toggleId = (id: string) => {
    if (!value) return;
    if (value.includes(id)) {
      removeId(id);
    } else {
      addId(id);
    }
  };

  return { favoriteIds: value, addId, removeId, toggleId };
};
