import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  return (
    <Container className="App">
      <h1>Smart Recipe Generator</h1>
      <IngredientInput onSubmit={setIngredients} />
      <RecipeList ingredients={ingredients} setRecipes={setRecipes} />
    </Container>
  );
}

export default App;