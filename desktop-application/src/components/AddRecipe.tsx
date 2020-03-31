import React, { useState } from 'react';
import { Button, Chip, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Ingredient, Tag } from '../types';

interface AddRecipeProps {
  ingredients: Ingredient[];
  tags: Tag[];
}

type SelectedIngredient = {
  ingredient: string;
  amount: number;
  unit: string;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ ingredients, tags }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([{ ingredient: '', amount: 0, unit: ''}]);
  const [selectedTags, setSelectedTags] = useState(new Array<string>());
  const [preparation, setPreparation] = useState('');

  const handleTextChange = (event: React.ChangeEvent<{ value: string, name: string }>) => {
    switch(event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'image':
        setImage(event.target.value);
        break;
      case 'preparation':
        setPreparation(event.target.value);
        break;
    }
  };

  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, { ingredient: '', amount: 0, unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients([...selectedIngredients.slice(0, index), ...selectedIngredients.slice(index+1)]);
  };

  const handleIngredientChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, index: number) => {
    if (typeof event.target.value !== 'string') return;
    console.log(event.target.value, event.target.name, index);
    switch(event.target.name) {
      case 'ingredient':
        setSelectedIngredients([...selectedIngredients.slice(0, index), { ...selectedIngredients[index], ingredient: event.target.value }, ...selectedIngredients.slice(index+1)]);
        break;
      case 'amount':
        setSelectedIngredients([...selectedIngredients.slice(0, index), { ...selectedIngredients[index], amount: parseInt(event.target.value) | 0 }, ...selectedIngredients.slice(index+1)]);
        break;
        case 'unit':
        setSelectedIngredients([...selectedIngredients.slice(0, index), { ...selectedIngredients[index], unit: event.target.value }, ...selectedIngredients.slice(index+1)]);
        break;
    }
  };

  const handleTagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTags(event.target.value as string[]);
  };

  const addRecipe = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('name :', name);
    console.log('image :', image);
    console.log('selectedIngredients :', selectedIngredients);
    console.log('selectedTags :', selectedTags.join(', '));
    console.log('preparation :', preparation);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={addRecipe}>
        <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: '25px', paddingBottom: '25px' }}>Add Recipe</Typography>
        <div style={{ display: 'flex', margin: '20px 0' }}>
          <TextField name="name" label="Name" placeholder="Enter a name" onChange={handleTextChange} InputLabelProps={{ shrink: true }} variant="outlined" fullWidth style={{ flex: 1, marginRight: '5px' }} />
          <TextField name="image" label="Image"  placeholder="Enter a url" onChange={handleTextChange} InputLabelProps={{ shrink: true }} variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px' }} />
        </div>
        {selectedIngredients.map((selected, index) => (
          <div key={index} style={{ display: 'flex', margin: '20px 0' }}>
            <div style={{ flex: 19 }}>
              <div id={`ingredient-input-${index}`} style={{ display: 'flex' }}>
                <FormControl variant="outlined" fullWidth style={{ flex: 3, marginRight: '5px' }}>
                  <InputLabel>Ingredient</InputLabel>
                  <Select name="ingredient" label="Ingredient" value={selected.ingredient} onChange={(e) => handleIngredientChange(e, index)} native fullWidth>
                    <option key="None" aria-label="None" value="" />
                    {ingredients.sort((a, b) => a.name > b.name ? 1 : -1).map(ingredient => (
                      <option key={ingredient.id} value={ingredient.name}>{ingredient.name.toLowerCase().replace(/./, c => c.toUpperCase())}</option>
                    ))}
                  </Select>
                </FormControl>
                <TextField name="amount" label="Amount" value={selected.amount || undefined} onChange={(e) => handleIngredientChange(e, index)} variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px', marginRight: '5px' }} />
                <FormControl variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px' }}>
                  <InputLabel>Unit</InputLabel>
                  <Select name="unit" label="Unit" value={selected.unit} onChange={(e) => handleIngredientChange(e, index)} native fullWidth>
                    <option key="None" value="" />
                    <option key="#" value="#">#</option>
                    <option key="g" value="g">gram</option>
                    <option key="cl" value="cl">centiliter</option>
                    <option key="el" value="el">eetlepel</option>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button variant="contained" onClick={() => removeIngredient(index)} style={{  flex: 1, margin: '0 5px', backgroundColor: '#dc3545', color: '#ffffff' }}>-</Button>
          </div>
        ))}
        <div style={{ margin: '20px 0' }}>
          <Button onClick={addIngredient} variant="contained" color="primary">Add ingredient</Button>
        </div>
        <div style={{ margin: '20px 0', padding: '18.5px 14px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}>
          <InputLabel>Tags</InputLabel>
          <Select
            name="tags"
            label="Tags"
            value={selectedTags}
            onChange={handleTagChange}
            multiple
            fullWidth
            input={<Input />}
            renderValue={(selected) => (
              <div>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} color="primary" style={{ margin: '2px' }} />
                ))}
              </div>
            )}
          >
            {tags.sort((a, b) => a.name > b.name ? 1 : -1).map(tag => (
              <MenuItem key={tag.id} value={tag.name}>{tag.name.replace(/./, c => c.toUpperCase())}</MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ margin: '20px 0' }}>
          <TextField name="preparation" label="Preparation"  onChange={handleTextChange} multiline rows="10" variant="outlined" fullWidth />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
      </form>
    </Container>
  );
};

export default AddRecipe;
