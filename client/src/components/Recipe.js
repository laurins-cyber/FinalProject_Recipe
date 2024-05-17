import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Recipe = ({ match }) => {
    const { id } = match.params;  
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  const fetchRecipe = () => {
// Fetch recipe details using id
  fetch(`api/recipe/${id}`)
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
        </div>
      )}
    </div>
    </>
    );
};

export default Recipe;