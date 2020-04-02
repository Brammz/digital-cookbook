import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { google } from 'googleapis';
import { Container } from '@material-ui/core';
import credentials from './credentials.json';
import { ExtrasDetails, ExtrasList, Navbar, Recipes, RecipeDetails, RecipeForm } from './components';
import { Recipe, IngredientInRecipe, Ingredient, Tag } from './types';
import './App.css';

const client = new google.auth.JWT(credentials.client_email, '', credentials.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const sheets = google.sheets('v4');

type SelectedIngredient = {
  ingredient: string;
  amount: number;
  unit: string;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState(Array<Recipe>());
  const [ingredients, setIngredients] = useState(Array<Ingredient>());
  const [tags, setTags] = useState(Array<Tag>());

  const shuffle = (recipes: Recipe[]) => {
    let a = [...recipes];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const shuffleProps = () => {
    setRecipes(shuffle(recipes));
  };

  const fetchData = async (shuffle: (a: Recipe[]) => Recipe[]) => {
    // fetch ingredients
    const ingredientsResponse = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: credentials.sheet_id,
      range: 'Ingredients',
      majorDimension: 'ROWS'
    });

    let processedIngredients = Array<Ingredient>();

    (ingredientsResponse?.data?.values || []).slice(1).forEach(ingredient => {
      processedIngredients.push(new Ingredient(Number(ingredient[0]), ingredient[1]));
    });

    setIngredients(processedIngredients);

    // fetch tags
    const tagsResponse = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: credentials.sheet_id,
      range: 'Tags',
      majorDimension: 'ROWS'
    });

    let processedTags = Array<Tag>();

    (tagsResponse?.data?.values || []).slice(1).forEach(tag => {
      processedTags.push(new Tag(Number(tag[0]), tag[1]));
    });

    setTags(processedTags);

    // fetch recipes
    const recipesResponse = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: credentials.sheet_id,
      range: 'Recipes',
      majorDimension: 'ROWS'
    });

    let processedRecipes = Array<Recipe>();

    (recipesResponse?.data?.values || []).slice(1).forEach(recipe => {
      let ingredients = Array<IngredientInRecipe>();
      JSON.parse(recipe[2]).forEach((i: any) => {
        ingredients.push({
          ingredient: processedIngredients.find(pi => pi.id === i.id) || new Ingredient(9999, 'Ingredient not found'),
          amount: i.amount,
          unit: i.unit
        });
      });

      let tags = Array<Tag>();
      JSON.parse(recipe[3]).forEach((t: any) => {
        tags.push(processedTags.find(pt => pt.id === t) || new Tag(9999, 'Tag not found'));
      });

      processedRecipes.push(new Recipe(Number(recipe[0]), recipe[1], ingredients, tags, recipe[4], recipe[5]));
    });

    setRecipes(shuffle(processedRecipes));
  };

  const addRecipe = async (name: string, selectedIngredients: SelectedIngredient[], selectedTags: string[], image: string, preparation: string) => {
    let newIngredients = selectedIngredients.map(selected => {
      return {
        id: (ingredients.find(i => i.name.toLowerCase() === selected.ingredient.toLowerCase()) || {}).id,
        amount: selected.amount,
        unit: selected.unit
      };
    });
    let newTags = selectedTags.map(selected => (tags.find(t => t.name.toLowerCase() === selected.toLowerCase()) || {}).id)
    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId: credentials.sheet_id,
      range: 'Recipes', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          recipes.length+1,
          name,
          JSON.stringify(newIngredients),
          JSON.stringify(newTags),
          image,
          preparation
        ]]
      }
    }).then(async res => {
      console.log('done :', res);
      await fetchData(shuffle);
    }).catch(err => {
      console.log('err :', err);
    });
  };

  const editRecipe = async (id: number, name: string, selectedIngredients: SelectedIngredient[], selectedTags: string[], image: string, preparation: string) => {
    let newIngredients = selectedIngredients.map(selected => {
      return {
        id: (ingredients.find(i => i.name.toLowerCase() === selected.ingredient.toLowerCase()) || {}).id,
        amount: selected.amount,
        unit: selected.unit
      };
    });
    let newTags = selectedTags.map(selected => (tags.find(t => t.name.toLowerCase() === selected.toLowerCase()) || {}).id)
    await sheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId: credentials.sheet_id,
      range: `Recipes!A${id+1}:F${id+1}`, 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          id,
          name,
          JSON.stringify(newIngredients),
          JSON.stringify(newTags),
          image,
          preparation
        ]]
      }
    }).then(async res => {
      console.log('done :', res);
    }).catch(err => {
      console.log('err :', err);
    });
  };

  useEffect(() => {
    fetchData(shuffle);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container>
          <Switch>
            <Route path={['/', '/recipes']} exact render={() => <Recipes recipes={recipes} shuffle={shuffleProps} />} />
            <Route path="/recipe/new" exact render={() => <RecipeForm addRecipe={addRecipe} ingredients={ingredients} tags={tags} />}/>
            <Route path="/recipe/:id" exact render={(props) => <RecipeDetails recipe={recipes.find(r => r.id === parseInt(props.match.params.id))} />} />
            <Route path="/recipe/edit/:id" exact render={(props) => <RecipeForm editRecipe={editRecipe} recipe={recipes.find(r => r.id === parseInt(props.match.params.id))} ingredients={ingredients} tags={tags} />} />
            <Route path="/ingredients" exact render={() => <ExtrasList items={ingredients} />} />
            <Route path="/ingredient/:id" exact render={(props) => <ExtrasDetails item={ingredients.find(i => i.id === parseInt(props.match.params.id))} recipes={recipes.filter(r => r.ingredients.some(i => i.ingredient.id === parseInt(props.match.params.id)))} />} />
            <Route path="/tags" exact render={() => <ExtrasList items={tags} />} />
            <Route path="/tag/:id" exact render={(props) => <ExtrasDetails item={tags.find(t => t.id === parseInt(props.match.params.id))} recipes={recipes.filter(r => r.tags.some(t => t.id === parseInt(props.match.params.id)))} />} />
            <Redirect to='/' />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
