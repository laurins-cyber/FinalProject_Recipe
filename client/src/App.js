import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./compoments/Navbar";
import Home from "./compoments/Home";
import Recipes from "./compoments/Recipes";
import Recipe from './compoments/Recipe';
import FavPage from "./compoments/FavPage";

const App = () => {

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
    </>
    )

};

export default App;