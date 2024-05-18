import React, { useEffect, useState } from 'react';

const FavPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('/api/favorites');
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <h2>Favorite Recipes</h2>
            <ul>
                {favorites.map(recipe => (
                    <li key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                        <p>{recipe.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavPage;