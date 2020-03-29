import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { RecipeList } from '.';
import { Recipe } from '../types';

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
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
      <TextField label="Search" placeholder="Enter a name, ingredient or tag..." InputLabelProps={{ shrink: true }} variant="outlined" fullWidth style={{ margin: '25px 0' }} onChange={search} />
      <RecipeList recipes={filteredRecipes} />
    </>
  );
};

export default Recipes;
