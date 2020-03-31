import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { RecipeList } from '.';
import { Recipe } from '../types';

interface RecipesProps {
  recipes: Recipe[];
  shuffle: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, shuffle }) => {
  const [filter, setFilter] = useState('');

  const search = (e: any) => {
    setFilter(e.target.value.toLowerCase());
  }

  const filteredRecipes = recipes.filter(recipe => (
    recipe.name.toLowerCase().includes(filter) ||
    recipe.ingredients.map(i => i.ingredient.name).some(i => i.toLowerCase().includes(filter)) ||
    recipe.tags.map(t => t.name).some(t => t.toLowerCase().includes(filter))
  ));

  return (
    <>
      <div className="input-group">
        <TextField label="Search" placeholder="Enter a name, ingredient or tag..." InputLabelProps={{ shrink: true }} variant="outlined" fullWidth onChange={search} />
        <Link to="/recipe/new" style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
          <Button variant="contained" color="primary" disableElevation style={{ height: '100%', width: '100%' }}>+</Button>
        </Link>
        <Button variant="contained" color="primary" disableElevation onClick={shuffle}>O</Button>
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
};

export default Recipes;
