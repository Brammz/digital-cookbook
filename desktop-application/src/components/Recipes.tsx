import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Icon } from '@material-ui/core';
import { Add, Shuffle, Cancel } from '@material-ui/icons';
import { RecipeList } from '.';
import { Recipe } from '../types';

interface RecipesProps {
  recipes: Recipe[];
  shuffle: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, shuffle }) => {
  const [filter, setFilter] = useState('');

  const clearSearch = () => {
    setFilter('');
  };

  const search = (e: any) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredRecipes = recipes.filter(recipe => (
    recipe.name.toLowerCase().includes(filter) ||
    recipe.ingredients.map(i => i.ingredient.name).some(i => i.toLowerCase().includes(filter)) ||
    recipe.tags.map(t => t.name).some(t => t.toLowerCase().includes(filter))
  ));

  return (
    <>
      <div className="input-group">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            type="text"
            placeholder="Enter a name, ingredient or tag..."
            value={filter}
            onChange={search}
            endAdornment={!filter ? '' :
              <InputAdornment position="end">
                <IconButton onClick={clearSearch} edge="end">
                  <Cancel />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Link to="/recipe/new" style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
          <Button variant="contained" color="primary" style={{ height: '100%', width: '100%' }}>
            <Icon><Add /></Icon>
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={shuffle}>
          <Icon><Shuffle /></Icon>
        </Button>
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
};

export default Recipes;
