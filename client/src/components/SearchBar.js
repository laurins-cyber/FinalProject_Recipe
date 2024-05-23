import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = ({ searchRecipes }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim() !== '') {
            searchRecipes(query)
                .then(data => {
                    // Redirect to the Recipes component with search results
                    navigate('/recipes', { state: { results: data } });
                })
                .catch(error => {
                    console.error('Error searching recipes:', error);
                });
        }
    };

    return (
    <div>
        <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter food ingredients (up to 3)" 
        />
        <p>Tips: A comma-separated list of ingredients should contain to search</p>
        <button onClick={handleSearch}>Search</button>
    </div>
    );
};

export default SearchBar;

const SearchInput = styled.input`
width: 60%;
font-size: 32px;
padding: 11px;
border: 1px solid white;
border-radius:30%;
`;

const Tips = styled.p`
width: 60%;
font-size: 18px;
`;