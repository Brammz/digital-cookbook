import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Chip, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Ingredient, Recipe, Tag } from '../types';

type SelectedIngredient = {
  ingredient: string;
  amount: number;
  unit: string;
}

interface RecipeFormProps {
  addRecipe?: (name: string, ingredients: SelectedIngredient[], tags: string[], image: string, preparation: string) => void;
  editRecipe?: (id: number, name: string, ingredients: SelectedIngredient[], tags: string[], image: string, preparation: string) => void;
  recipe?: Recipe;
  ingredients: Ingredient[];
  tags: Tag[];
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipe, editRecipe, recipe, ingredients, tags }) => {
  const [name, setName] = useState(recipe ? recipe.name : '');
  const [nameValidation, setNameValidation] = useState({ error: false, helperText: '' });
  const [image, setImage] = useState(recipe ? recipe.image : '');
  const [imageValidation, setImageValidation] = useState({ error: false, helperText: '' });
  const [selectedIngredients, setSelectedIngredients] = useState(recipe ? recipe.ingredients.map(iir => { return { ingredient: iir.ingredient.name, amount: iir.amount, unit: iir.unit }}) : [{ ingredient: '', amount: 0, unit: ''}]);
  const [selectedTags, setSelectedTags] = useState(recipe ? recipe.tags.map(tag => tag.name) : new Array<string>());
  const [preparation, setPreparation] = useState(recipe ? recipe.preparation : '');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  let history = useHistory();

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

  const submitRecipe = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSubmitDisabled(true);
    if (name.length < 5) {
      setNameValidation({ error: true, helperText: 'Name too short.' });
      setSubmitDisabled(false);
      return;
    }
    if (!/^https?:\/\/(www\.)?[A-Za-z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(image)) {
      setImageValidation({ error: true, helperText: 'Not a valid url.' });
      setSubmitDisabled(false);
      return;
    }
    setNameValidation({ error: false, helperText: '' });
    setImageValidation({ error: false, helperText: '' });
    if (recipe && editRecipe) {
      await editRecipe(recipe.id, name, selectedIngredients, selectedTags, image, preparation);
      history.push(`/recipe/${recipe.id}`);
    } else if (addRecipe) {
      await addRecipe(name, selectedIngredients, selectedTags, image, preparation);
      history.push('/');
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={submitRecipe}>
        <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: '25px', paddingBottom: '25px' }}>{recipe ? 'Edit' : 'Add'} Recipe</Typography>
        <div style={{ display: 'flex', margin: '20px 0' }}>
          <TextField name="name" label="Name" placeholder="Enter a name" value={name} onChange={handleTextChange} error={nameValidation.error} helperText={nameValidation.helperText} variant="outlined" fullWidth style={{ flex: 1, marginRight: '5px' }} />
          <TextField name="image" label="Image"  placeholder="Enter a url" value={image} onChange={handleTextChange} error={imageValidation.error} helperText={imageValidation.helperText} variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px' }} />
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
                <TextField type="number" name="amount" label="Amount" value={selected.amount || undefined} onChange={(e) => handleIngredientChange(e, index)} variant="outlined" fullWidth style={{ flex: 1, marginLeft: '5px', marginRight: '5px' }} />
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
          <TextField name="preparation" label="Preparation" placeholder="Enter the preparation (use '>' to add a new item to the numbered list)" value={preparation} onChange={handleTextChange} multiline rows="10" variant="outlined" fullWidth />
        </div>
        {recipe && (
          <Link to={`/recipe/${recipe?.id}`} style={{ color: 'inherit', 'cursor': 'pointer', 'textDecoration': 'inherit' }}>
            <Button type="submit" variant="contained" style={{ float: 'left' }}>Back</Button>
          </Link>
        )}
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => history.goBack()} variant="contained" style={{ float: 'left' }}>Back</Button>
          <Button type="submit" disabled={submitDisabled} variant="contained" color="primary" style={{ float: 'right' }}>{recipe ? 'Save' : 'Add'}</Button>
        </div>
      </form>
    </Container>
  );
};

export default RecipeForm;
