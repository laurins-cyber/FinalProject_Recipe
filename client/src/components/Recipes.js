import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';


const Recipes = ({ recipes, onFavorite }) => {
    const location = useLocation();
    const results = recipes.length ? recipes : (location.state?.results || []); // Use passed props or location state


    return (
        <>
        
        <Container>
        <StyledText>We offer you:</StyledText>
            <StyledList>
                {results.map(recipe => (
                    <StyledItem key={recipe.id}>
                        <StyledImg src={recipe.image} alt={recipe.title} />
                        <StyledLink to={`/recipe/${recipe.id}`}>{recipe.title}</StyledLink>
                        <StyledButton onClick={() => onFavorite(recipe.id)}>⭐Add to Favorite</StyledButton>
                    </StyledItem>
                ))}
            </StyledList>
        </Container>
        </>
    );
};

export default Recipes;


const Container = styled.div`
justify-content: center;
background-color:#171717;
margin:0px;
padding-top:100px;
`;
const StyledText = styled.h2`
text-align:center;

color:white;
font-family: "Kranky", serif;
font-weight: 400;
font-style: none;
font-size: 32px;
`;

const StyledList = styled.ul`
        -moz-column-count: 2;
            column-count: 2;
        list-style-type: none;
        margin:0px;
`;

const StyledItem = styled.li`
text-align: center;
display: inline-block;
width: 100%;
margin-top: 100px;
`;

const StyledLink = styled(Link)`
display: block;
text-decoration: none;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
color: white;
margin-top:24px;

&:hover {
    border: 2px dashed white;
    padding: 5px 0px;
    border-radius:15px;
}
`;

const StyledButton = styled.button`
border: 2px dashed gold;
margin-top: 15px;
padding: 10px;
background-color:#171717;
color:white;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
border-radius: 60px;
`;

const StyledImg = styled.img`
width: 30%;
border-radius: 60px;
`