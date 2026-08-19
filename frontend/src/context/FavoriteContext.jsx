import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("evently-favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "evently-favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const toggleFavorite = (eventId) => {
        setFavorites((prev) => {
            if (prev.includes(eventId)) {
                return prev.filter((id) => id !== eventId);
            }

            return [...prev, eventId];
        });
    };

    const isFavorite = (eventId) => {
        return favorites.includes(eventId);
    };

    const removeFavorite = (eventId) => {
        setFavorites((prev) =>
            prev.filter((id) => id !== eventId)
        );
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
                removeFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);