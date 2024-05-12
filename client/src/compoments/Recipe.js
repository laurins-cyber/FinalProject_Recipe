import React from 'react';

const Recipe = ({ match }) => {
    const { id } = match.params;

  // Fetch recipe details using id

    return (
    <div>
        <h2>Recipe Details</h2>
      {/* Display recipe details */}
    </div>
    );
};

export default Recipe;