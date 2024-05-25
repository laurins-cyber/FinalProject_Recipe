import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import banner from '../images/banner3.jpg';

const Recipe = ({ onFavorite, favoriteIds }) => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    

    useEffect(() => {
        fetchRecipe(id);
    }, [id]);

    const fetchRecipe = async (id) => {
        try {

            const response = await fetch(`http://localhost:3001/api/recipe/${id}`);
            console.log(id);
            if (!response.ok) {
                throw new Error("Failed to fetch recipe");
            }
            const data = await response.json();
            console.log(data);
            setRecipe(data);

        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    const handleFavorite = () => {
        console.log('Favorite button clicked');//debug
        // Additional Debugging
        console.log('Current recipe:', recipe);
        //console.log('Current recipes array:', recipes);
      if (recipe && !favoriteIds.find(r => r.id === recipe.id)) {
        console.log('Sending favorite request for recipe:', recipe);
          onFavorite(recipe.id);
      } else {
        console.log('Recipe already in favorites or not found:', recipe);
    }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            <ButtonContainer>
                <BackButton onClick={handleGoBack}>Back</BackButton>
            </ButtonContainer>
            
                {recipe && (
                    <RecipeContainer>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                        
                        <IngredientList>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </IngredientList>
                        <p>Cooking time: {recipe.readyInMinutes} minutes</p>
                        <p>{recipe.summary}</p>
                        <h3>Steps</h3>
                        <ol>
                            {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
                                <li key={index}>
                                    {step.step}
                                </li>
                            ))}
                        </ol>
                        
                        <StyledButton onClick={handleFavorite}>⭐Add to Favorite</StyledButton>
                    </RecipeContainer>
                )}
            <StyledImg src={banner} alt="banner" />
        </Container>
    );
};

export default Recipe;

const Container = styled.div`
padding: 150px 100px;
background-color:#171717;
color: white;
`;

const ButtonContainer = styled.div`
margin-bottom: 20px;
`;

const BackButton = styled.button`
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

const RecipeContainer = styled.div`
text-align: center;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
font-size: 16px;
    h2 {
        margin-bottom: 20px;
        font-size: 32px;
        font-family: "Kranky", serif;
        font-weight: 600;
        font-style: normal;
    }

    h3 {
        margin-bottom: 20px;
        font-size: 24px;
        font-family: "Kranky", serif;
        font-weight: 400;
        font-style: normal;
    }

    img {
        max-width: 400px;
        height: auto;
        margin-bottom: 50px;
        border-radius:30px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    p {
        text-align: left;
        padding: 20px;
    }

    ol {
        text-align: left;
    }
`;

const IngredientList = styled.ul`
    text-align: center;
    margin-bottom: 20px;

    li {
        width: 45%;
        text-align: left;
        margin-bottom: 10px;
    }
`;

const StyledImg = styled.img`
width:100%;
height:auto;
`;

const StyledButton = styled.button`
border: 2px dashed gold;
margin-top: 15px;
padding: 10px;
background-color:#171717;
color:white;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
border-radius: 60px;
`;