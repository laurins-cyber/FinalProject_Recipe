import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/favorites');
                const data = await response.json();
                setFavorites(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
        {isLoading ? (
            <p>Loading...</p>
        ) : ( 
            <div>
            {favorites.length === 0 ? (
            <h2>Your do not have any Favorite yet!</h2>
        ):(
            <div>
            <h2>Favorite Recipes</h2>
            <ul>
                {favorites.map(recipe => (
                    <li key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </li>
                ))}
            </ul>
        </div>)}
        </div>)};
        </div>
        );
};

export default FavPage;