import React from 'react';
import { Grid } from '@material-ui/core';
import { RecipeCard } from '.';
import { Recipe } from '../types';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map(recipe => (
        <Grid key={recipe.id} item xs={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
