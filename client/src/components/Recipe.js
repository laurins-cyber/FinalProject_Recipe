import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        <>
            <div>
                <button onClick={handleGoBack}>Back</button>
                {recipe && <h2>{recipe.title}</h2>}
            </div>
            <div>
                {recipe && (
                    <div>
                        <img src={recipe.image} alt={recipe.title} />
                        
                        <ul>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
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
                        
                        <button onClick={handleFavorite}>Add to Favorite</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Recipe;