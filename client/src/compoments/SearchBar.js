import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
    if (query.trim() !== '') {
        fetch(`/api/search?query=${query}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to fetch recipes');
            }
            return response.json();
        })
        .then(data => {
          // Redirect to the Recipes component with search results
            navigate('/recipes', { state: { results: data.results } });
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