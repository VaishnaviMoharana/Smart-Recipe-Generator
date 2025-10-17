import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import recipesData from '../data/recipes.json';

function RecipeList({ ingredients, setRecipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      const matchedRecipes = recipesData.filter(recipe => 
        ingredients.some(ing => recipe.ingredients.includes(ing))
      );
      setFilteredRecipes(matchedRecipes);
      setRecipes(matchedRecipes);
    }
  }, [ingredients, setRecipes]);

  return (
    <div>
      <h2>Matched Recipes</h2>
      <ListGroup>
        {filteredRecipes.map(recipe => (
          <ListGroup.Item key={recipe.id}>
            {recipe.name} - Calories: {recipe.nutrition.calories}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default RecipeList;