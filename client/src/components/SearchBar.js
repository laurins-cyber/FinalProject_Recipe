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
    <Container>
        <SearchWrapper>
        <SearchInput 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter food ingredients (up to 3)" 
        />
        <Tips>Tips: A comma-separated list of ingredients should contain to search</Tips>
        <SearchButton onClick={handleSearch}>GO!</SearchButton>
        </SearchWrapper>
    </Container>
    );
};

export default SearchBar;
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-image: url('images/searchbar.jpg'); 
background-size: cover;
background-position: center;
`;

const SearchWrapper = styled.div`
text-align: center;
background: #161717; 
padding: 20px;
border-radius: 10px;
`;

const SearchInput = styled.input`
width: 60%;
font-size: 24px;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: white;
padding: 11px;
border: 1px solid white;
border-radius:30%;
`;

const Tips = styled.p`
width: 60%;
font-size: 16px;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: white;
`;

const SearchButton = styled.button`
padding: 10px 20px;
font-size: 24px;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: white;
background-color: #161717;
border: 2px dashed white;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: white;
    color:#161717;
}
`;