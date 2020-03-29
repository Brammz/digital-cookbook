import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
      <Card>
        <CardActionArea>
          <CardMedia style={{ height: '20vh', objectFit: 'cover' }} image={recipe.image} title={recipe.name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {recipe.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default RecipeCard;
