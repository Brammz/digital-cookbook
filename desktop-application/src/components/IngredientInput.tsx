import React, { useState } from 'react';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import { Ingredient } from '../types';

interface IngredientInputProps {
  index: number;
  ingredients: Ingredient[];
}

const IngredientInput: React.FC<IngredientInputProps> = ({ index, ingredients }) => {
  const [ingredient, setIngredient] = useState('');
  const [unit, setUnit] = useState('');

  const handleIngredientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIngredient(event.target.value as string);
  };

  const handleUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUnit(event.target.value as string);
  };

  return (
    <div id={`ingredient-input-${index}`} style={{ display: 'flex' }}>
      <FormControl variant="outlined" fullWidth style={{ flex: 3, marginRight: '5px' }}>
        <InputLabel>Ingredient</InputLabel>
        <Select native label="Ingredient" value={ingredient} onChange={handleIngredientChange} fullWidth>
          <option key="None" aria-label="None" value="" />
          {ingredients.sort((a, b) => a.name > b.name ? 1 : -1).map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.name.toLowerCase().replace(/./, c => c.toUpperCase())}</option>
          ))}
        </Select>
      </FormControl>
      <TextField label="Amount" variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px', marginRight: '5px' }} />
      <FormControl variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px' }}>
        <InputLabel>Unit</InputLabel>
        <Select native label="Ingredient" defaultValue={unit} onChange={handleUnitChange} fullWidth>
          <option key="None" value="" />
          <option key="#" value="#">#</option>
          <option key="g" value="g">gram</option>
          <option key="cl" value="cl">cl</option>
          <option key="el" value="el">eetlepel</option>
        </Select>
      </FormControl>
    </div>
  )
}

export default IngredientInput;
