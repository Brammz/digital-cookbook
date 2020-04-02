import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import { Recipe } from '../types';

interface RecipeDetailsProps {
  recipe: Recipe | undefined;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  let history = useHistory();

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
            <Link key={tag.id} to={`/tag/${tag.id}`} style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
              <Chip color="primary" label={tag.name.replace(/./, c => c.toUpperCase())} style={{ margin: '2px' }} />
            </Link>
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
              <span className="ingredient-name">
                <Link to={`/ingredient/${ingredient.ingredient.id}`} style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
                  {ingredient.ingredient.name.replace(/./, c => c.toUpperCase())}
                </Link>
              </span>
              <span className="dots"></span>
              <span className="ingredient-unit">{ingredient.amount}{ingredient.unit !== '#' && ' ' + ingredient.unit}</span>
            </div>
          ))}
        </Grid>
      </Grid>
      <div style={{ marginTop: '15px' }}>
        <Button type="submit" onClick={() => history.goBack()} variant="contained" style={{ float: 'left' }}>Back</Button>
        <Link to={`/recipe/edit/${recipe?.id}`} style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
          <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>Edit</Button>
        </Link>
      </div>
    </Container>
  );
};

export default RecipeDetails;
