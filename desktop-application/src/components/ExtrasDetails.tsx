import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { RecipeList } from '.';
import { Ingredient, Recipe, Tag } from '../types';

interface ExtrasDetailsProps {
  item: Ingredient | Tag | undefined;
  recipes: Recipe[];
}

const ExtrasDetails: React.FC<ExtrasDetailsProps> = ({ item, recipes }) => {
  let history = useHistory();

  return (
    <>
      <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: '25px', paddingBottom: '25px', textAlign: 'center' }}>
        {item?.name.toLowerCase().replace(/./, c => c.toUpperCase())}
      </Typography>
      <RecipeList recipes={recipes} />
      <div style={{ marginTop: '25px' }}>
        <Button type="submit" onClick={() => history.goBack()} variant="contained" style={{ float: 'left' }}>Back</Button>
      </div>
    </>
  )
}

export default ExtrasDetails;
