import React from 'react';
import SearchBar from './SearchBar';

const Home = ({ searchRecipes }) => {
    return (
        <>
        <div>
            <SearchBar searchRecipes={searchRecipes} />
        </div>

        <h2>About us</h2>
        <p>
        We would love to support your meals and save your time! Let us eat healthy and happy!
        </p>
        <p>
        Out of ideas for your prep? We got your back!
        </p>
        </>
    );
};

export default Home;