import React from 'react';
import SearchBar from './SearchBar';

const Home = ({ searchRecipes }) => {
    return (
        <div>
            <SearchBar searchRecipes={searchRecipes} />
        </div>
    );
};

export default Home;