import React from 'react';
import Recipes from './Recipes';

const RecipeList = ({ recipes, onFavorite }) => {
    return (
        <div>
            <Recipes recipes={recipes} onFavorite={onFavorite} />
        </div>
    );
};

export default RecipeList;