import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fridge from '../images/fridge.jpg';

const FavPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [editingMemoId, setEditingMemoId] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/favorites');
                const data = await response.json();
                setFavorites(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/favorites/${id}`, {
                method: 'DELETE'
            });

            // Update the state to remove the deleted recipe
            setFavorites(favorites.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    const handleMemoChange = (id, newMemo) => {
        setFavorites(favorites.map(recipe => {
            if (recipe.id === id) {
                return { ...recipe, memo: newMemo };
            }
            return recipe;
        }));
    };

    const handleEditMemo = (id) => {
        setEditingMemoId(id);
    };

    const renderMemoEditor = (recipe) => {
        return (
            <div>
                <textarea
                    value={recipe.memo || ''}
                    onChange={e => handleMemoChange(recipe.id, e.target.value)}
                    placeholder="Add your memo or notes here..."
                />
                <button onClick={() => handleSaveMemo(recipe.id, recipe.memo)}>Save Memo</button>
            </div>
        );
    };

    const renderMemoViewer = (recipe) => {
        return (
            <div>
                <p>{recipe.memo}</p>
                <button onClick={() => handleEditMemo(recipe.id)}>Edit</button>
            </div>
        );
    };

    const handleSaveMemo = async (id, memo) => {
        try {
            const response = await fetch(`http://localhost:3001/api/favorites/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ memo })
            });

            if (!response.ok) {
                console.error('Failed to save memo', errorText);
            } else {
                // Successfully saved the memo, update the state to stop editing
                setEditingMemoId(null);
            }
        } catch (error) {
            console.error('Error saving memo:', error);
        }
    };

    return (
        <Container>
        {isLoading ? (
            <StyledText>Loading...🍕🥑🧁</StyledText>
        ) : ( 
            <div>
            {favorites.length === 0 ? (
            <StyledText>Your do not have any Favorite yet!</StyledText>
        ):(
            <div>
            <StyledTitle>Favorite Recipes</StyledTitle>
            <StyledList>
                {favorites.map(recipe => (
                    <StyledItem key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                    <StyledLink to={`/recipe/${recipe.id}`}>{recipe.title}</StyledLink>
                    <StyledLink to={`/recipe/${recipe.id}`}>{recipe.title}</StyledLink>
                                        {editingMemoId === recipe.id ? 
                                            renderMemoEditor(recipe) :
                                            renderMemoViewer(recipe)
                                        }
                    <StyledButton onClick={() => handleDelete(recipe.id)}>Remove</StyledButton>
                </StyledItem>
                ))}
            </StyledList>
        </div>)}
        </div>)}
        <StyledImg src={fridge} alt="Fav Logo"/>
        </Container>
        );
};

export default FavPage;

const Container = styled.div`
padding:150px 10%;
background-color: #171717;
color: white;
`;

const StyledText = styled.p`
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
font-size: 24px;
`;

const StyledTitle = styled.h2`
font-family: "Kranky", serif;
font-weight: 400;
font-style: none;
font-size: 32px;
`;

const StyledImg = styled.img`
width:400px;
float:right;
`;

const StyledList = styled.ul`
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
`;

const StyledButton = styled.button`
background-color:#171717;
color:gold;
border: 2px dashed gold;
border-radius:10px;
`;