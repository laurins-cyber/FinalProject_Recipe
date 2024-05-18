import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Recipes = ({ recipes, onFavorite }) => {
    const location = useLocation();
    const results = recipes.length ? recipes : (location.state?.results || []); // Use passed props or location state

    const handleFavorite = (recipe) => {
        if (!recipes.find(r => r.id === recipe.id)) {
            onFavorite(recipe.id);
        }
    };

    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {results.map(recipe => (
                    <li key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        <button onClick={() => handleFavorite(recipe)}>Add to Favorite</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;