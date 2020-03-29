import React from 'react';
import { Chip, Container, Grid, Typography } from '@material-ui/core';
import { Recipe } from '../types';

interface RecipeDetailsProps {
  recipe: Recipe | undefined;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <Container maxWidth="md" style={{ paddingTop: '25px' }}>
      <Grid container>
        <Grid item xs={4}>
          <img src={recipe?.image} alt={recipe?.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={8} style={{ padding: '20px' }}>
          <Typography gutterBottom variant="h4" component="h2">
            {recipe?.name}
          </Typography>
          {recipe?.tags.map(tag => (
            <Chip key={tag.id} color="primary" label={tag.name.replace(/./, c => c.toUpperCase())} style={{ margin: '2px' }} />
          ))}
        </Grid>
        <Grid item xs={6} style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #555' }}>
          <Typography gutterBottom variant="h5" component="h2">
            Bereiding
          </Typography>
          <ol>
            {recipe?.preparation.split('>').map((line, index) => (
              <li key={index}>{line.replace(/./, c => c.toUpperCase())}</li>
            ))}
          </ol>
        </Grid>
        <Grid item xs={6} style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #555' }}>
          <Typography gutterBottom variant="h5" component="h2">
            Ingredienten
          </Typography>
          {recipe?.ingredients.map(ingredient => (
            <div className="ingredient">
              <span className="ingredient-name">{ingredient.ingredient.name.replace(/./, c => c.toUpperCase())}</span>
              <span className="dots"></span>
              <span className="ingredient-unit">{ingredient.amount}{ingredient.unit !== '#' && ' ' + ingredient.unit}</span>
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetails;
