import React from 'react';
import SearchBar from './SearchBar';

const Home = ({ searchRecipes }) => {
    return (
        <div>
            <h2>Welcome to Recipe Search</h2>
            <SearchBar searchRecipes={searchRecipes} />
        </div>
    );
};

export default Home;