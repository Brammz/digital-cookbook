import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { Ingredient } from '../types';

interface IngredientFormProps {
  addIngredient: (name: string) => void;
  ingredients: Ingredient[];
}

const IngredientForm: React.FC<IngredientFormProps> = ({ addIngredient, ingredients }) => {
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState({ error: false, helperText: '' });
  const [submitDisabled, setSubmitDisabled] = useState(false);

  let history = useHistory();

  const handleNameChange = (event: React.ChangeEvent<{ value: string, name: string }>) => {
    setName(event.target.value);
  };

  const submitIngredient = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSubmitDisabled(true);
    if (ingredients.some(i => i.name.toLowerCase() === name)) {
      setNameValidation({ error: true, helperText: 'Ingredient already exists.' });
      setSubmitDisabled(false);
      return;
    }
    if (name.length < 2) {
      setNameValidation({ error: true, helperText: 'Name too short.' });
      setSubmitDisabled(false);
      return;
    }
    setNameValidation({ error: false, helperText: '' });
    await addIngredient(name);
    history.push('/');
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={submitIngredient}>
        <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: '25px', paddingBottom: '25px' }}>Add Ingredient</Typography>
        <TextField name="name" label="Name" placeholder="Enter a name" value={name} onChange={handleNameChange} error={nameValidation.error} helperText={nameValidation.helperText} variant="outlined" fullWidth />
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => history.goBack()} variant="contained" style={{ float: 'left' }}>Back</Button>
          <Button type="submit" disabled={submitDisabled} variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
        </div>
      </form>
    </Container>
  );
};

export default IngredientForm;
