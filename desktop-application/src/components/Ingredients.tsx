import React from 'react';
import { Container } from '@material-ui/core';
import { SubheaderList } from '.';
import { Ingredient } from '../types';

interface IngredientsProps {
  ingredients: Ingredient[];
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {
  const reducedIngredients = ingredients.reduce((acc, ingredient) => {
    let letter = ingredient.name.slice(0,1).toUpperCase();
    if (!acc[letter]) acc[letter] = [ingredient.name.toLowerCase().replace(/./, c => c.toUpperCase())];
    else acc[letter].push(ingredient.name.toLowerCase().replace(/./, c => c.toUpperCase()));
    return acc;
  }, {} as { [key: string]: string[] });

  return (
    <Container maxWidth="md" style={{ paddingTop: '25px' }}>
      <SubheaderList redirect="ingredient" items={reducedIngredients} />
    </Container>
  );
};

export default Ingredients;
