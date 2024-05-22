import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                console.error('Failed to save memo');
            }
        } catch (error) {
            console.error('Error saving memo:', error);
        }
    };

    return (
        <div>
        {isLoading ? (
            <p>Loading...</p>
        ) : ( 
            <div>
            {favorites.length === 0 ? (
            <h2>Your do not have any Favorite yet!</h2>
        ):(
            <div>
            <h2>Favorite Recipes</h2>
            <ul>
                {favorites.map(recipe => (
                    <li key={recipe.id}>
                        <img src={recipe.image} alt={recipe.title} />
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    <textarea
                        value={recipe.memo || ''}
                        onChange={e => handleMemoChange(recipe.id, e.target.value)}
                        placeholder="Add your memo or notes here..."
                    />
                    <button onClick={() => handleSaveMemo(recipe.id, recipe.memo)}>Save Memo</button>
                    <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>)}
        </div>)}
        </div>
        );
};

export default FavPage;