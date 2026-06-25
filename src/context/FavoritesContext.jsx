import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("sl_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sl_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (destination) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === destination.id)) return prev;
      return [...prev, destination];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
