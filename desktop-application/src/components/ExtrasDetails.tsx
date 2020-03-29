import React from 'react';
import { Typography } from '@material-ui/core';
import { RecipeList } from '.';
import { Ingredient, Recipe, Tag } from '../types';

interface ExtrasDetailsProps {
  item: Ingredient | Tag | undefined;
  recipes: Recipe[];
}

const ExtrasDetails: React.FC<ExtrasDetailsProps> = ({ item, recipes }) => {
  return (
    <>
      <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: '25px', paddingBottom: '25px', textAlign: 'center' }}>
        {item?.name.toLowerCase().replace(/./, c => c.toUpperCase())}
      </Typography>
      <RecipeList recipes={recipes} />
    </>
  )
}

export default ExtrasDetails;
