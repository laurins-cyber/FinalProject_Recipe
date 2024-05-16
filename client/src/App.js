import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RecipeList from "./components/RecipeList";
import Recipe from './components/Recipe';
import FavPage from "./components/FavPage";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const searchRecipes = async (ingredients) => {
        try {
            const response = await fetch (`http://localhost:5000/api/search?ingredients=${ingredients}`);
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleFavorite = async (id) => {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;

        try {
            const response = await fetch('http://localhost:5000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });
            if (response.ok) {
                setFavoriteIds([...favoriteIds, id]);
            } else {
                console.error('Failed to add to favorites');
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    return(
    <Router>
        <Navbar />
        <div>
                <Routes>
                    <Route path="/" element={<Home searchRecipes={searchRecipes} />} />
                    <Route path="/recipes" element={<RecipeList recipes={recipes} onFavorite={handleFavorite} />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/favorites" element={<FavPage />} />
                </Routes>
            </div>
    </Router>
    )

};

export default App;