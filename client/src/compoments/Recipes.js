import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ location }) => {
    const { results } = location.state;

    return (
    <div>
        <h2>Search Results</h2>
        <ul>
        {results.map(recipe => (
            <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default Recipes;