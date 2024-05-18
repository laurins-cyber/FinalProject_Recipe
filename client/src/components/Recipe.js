import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Recipe = ({onFavorite, recipes}) => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  const handleFavorite = (recipe) => {
    if (!recipes.find(r => r.id === recipe.id)) {
        onFavorite(recipe.id);
    }
};

  const fetchRecipe = (id) => {
// Fetch recipe details using id
fetch(`/api/recipe/${id}`)
  .then(response => {
    if(!response.ok) {
      throw new Error("Fail to fetch recipe");
    }
    return response.json();
  })
  .then(data =>{
    setRecipe(data);
  })
  .catch(error => {
    console.error("Error fetching recipe:", error);
  });
  };

  const handleGoBack = () => {
    navigate(-1);
  }

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
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
          <p>Cooking time: {recipe.cookingTime}</p>
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>
                {step}
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