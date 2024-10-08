import React, { createContext, useState, useContext } from "react";

const FavoriteContext = createContext(null);

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;

export const useFavorites = () => {
  const value = useContext(FavoriteContext);
  return value;
};
