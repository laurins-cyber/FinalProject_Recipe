import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import searchbar from '../images/searchbar.jpg';

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
            <Tips>Search your food ↓</Tips>
        <SearchInput 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter food ingredients (up to 3)" 
        />
        <Tips>Tips: A comma should be contained to separated multiple ingredients.</Tips>
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
background-image: url(${searchbar}); 
background-size: cover;
background-position: center;
background-color:#171717;
`;

const SearchWrapper = styled.div`
text-align: center;
background: #161717; 
padding: 30px;
border-radius: 30px;
`;

const SearchInput = styled.input`
width:350px;
font-size: 16px;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: black;
padding: 11px;
border-radius: 15px;
`;

const Tips = styled.p`
font-size: 20px;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
color: white;
`;

const SearchButton = styled.button`
padding: 10px 20px;
font-size: 24px;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
color: white;
background-color: #161717;
border: 2px dashed white;
border-radius: 30px;
cursor: pointer;
&:hover {
    background-color: white;
    color:#161717;
}
`;