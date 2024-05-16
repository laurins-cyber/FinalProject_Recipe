import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./compoments/Navbar";
import Home from "./compoments/Home";
import RecipeList from "./compoments/RecipeList";
import Recipe from './compoments/Recipe';
import FavPage from "./compoments/FavPage";

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

    const handleFavorite = () => {
        setFavoriteIds([...favoriteIds, id]);
    }

    return(
    <>
    <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favorites" element={<FavPage />} />
        </Routes>
    </Router>
    <div>
        <h1>Recipe Search</h1>
        <SearchBar onSearch={searchRecipes} />
        <RecipeList recipes={recipes} onFavorite={handleFavorite} />
    </div>
    </>
    )

};

export default App;