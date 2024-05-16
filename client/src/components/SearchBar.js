import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <button onClick={handleSearch}>Search</button>
    </div>
    );
};

export default SearchBar;