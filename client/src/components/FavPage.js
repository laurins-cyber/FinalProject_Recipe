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
            <MemoContainer>
                <StyledTextarea
                    value={recipe.memo || ''}
                    onChange={e => handleMemoChange(recipe.id, e.target.value)}
                    placeholder="Add your memo or notes here..."
                />
                <MemoButton onClick={() => handleSaveMemo(recipe.id, recipe.memo)}>Save Memo</MemoButton>
            </MemoContainer>
        );
    };

    const renderMemoViewer = (recipe) => {
        return (
            <MemoContainer>
                <MemoText>{recipe.memo}</MemoText>
                <MemoButton onClick={() => handleEditMemo(recipe.id)}>Edit</MemoButton>
            </MemoContainer>
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
            <StyledText>You do not have any Favorite yet!</StyledText>
        ):(
            <div>
            <StyledTitle>Favorite Recipes</StyledTitle>
            <StyledList>
                {favorites.map(recipe => (
                    <StyledItem key={recipe.id}>
                        <LeftColumn>
                                            <StyledImg src={recipe.image} alt={recipe.title} />
                                            <StyledLink to={`/recipe/${recipe.id}`}>{recipe.title}</StyledLink>
                                            <StyledButton onClick={() => handleDelete(recipe.id)}>Remove</StyledButton>
                        </LeftColumn>
                        <RightColumn>
                                            <StyledTitle>Add Memo ↓</StyledTitle>
                                            {editingMemoId === recipe.id ? 
                                                renderMemoEditor(recipe) :
                                                renderMemoViewer(recipe)
                                            }
                        </RightColumn>
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
border-radius: 30px;
`;

const StyledList = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const StyledItem = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-top: 20px;
padding: 10px;
border-radius: 10px;
`;

const LeftColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 30%;
padding: 20px 100px;
`;

const RightColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 65%;
`;

const StyledLink = styled(Link)`
padding-top:20px;
text-decoration: none;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
font-size:24px;
color: white;
margin-top: 10px;
`;

const StyledButton = styled.button`
background-color: #171717;
color: gold;
border: 2px dashed gold;
border-radius: 10px;
margin-top: 10px;
padding: 5px 10px;
font-family: "Kranky", serif;
font-weight: 400;
font-style: normal;
`;

//MEMO CSS
const MemoContainer = styled.div`
    width: 400px;
    height:100px;
    background-color: #282828;
    border-radius: 8px;
    padding: 10px;
    position: relative;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    background-color: #282828;
    color: white;
    font-family: "Fuzzy Bubbles", sans-serif;
    font-weight: 400;
    font-style: normal;
    border: none;
    resize: none;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const MemoButton = styled.button`
    background-color: #171717;
    color: gold;
    border: 2px dashed gold;
    border-radius: 10px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-family: "Kranky", serif;
    font-weight: 400;
    font-style: normal;
`;

const MemoText = styled.p`
    color: white;
    white-space: pre-wrap;  // This will keep the white spaces and line breaks in the memo
    padding: 10px;
    margin: 0;
    font-family: "Fuzzy Bubbles", sans-serif;
    font-weight: 400;
    font-style: normal;
`;