import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { book, nutrition, pricetags, cart } from 'ionicons/icons';
import { Recipe, Ingredient, Tag } from './types';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Ingredients from './pages/Ingredients';
import IngredientDetails from './pages/IngredientDetails';
import Tags from './pages/Tags';
import TagDetails from './pages/TagDetails';
import ShoppingCart from './pages/ShoppingCart';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Personal styling */
import './App.css';

import { google } from 'googleapis';
import credentials from './credentials.json';

const client = new google.auth.JWT(credentials.client_email, '', credentials.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const sheets = google.sheets('v4');

const App: React.FC = () => {
  const [recipes, setRecipes] = useState(Array<Recipe>());
  const [ingredients, setIngredients] = useState(Array<Ingredient>());
  const [tags, setTags] = useState(Array<Tag>());

  useEffect(() => {
    console.log('first effect')
    fetchData();
  }, []);

  async function fetchData() {
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
      let ingredients = Array<Ingredient>();
      JSON.parse(recipe[2]).forEach((i: any) => {
        ingredients.push({
          ...i,
          ingredient: processedIngredients.find(pi => pi.id === i.id) || new Ingredient(9999, 'Ingredient not found')
        });
      });

      let tags = Array<Tag>();
      JSON.parse(recipe[3]).forEach((t: any) => {
        tags.push(processedTags.find(pt => pt.id === t) || new Tag(9999, 'Tag not found'));
      });

      processedRecipes.push(new Recipe(Number(recipe[0]), recipe[1], ingredients, tags, recipe[4], recipe[5]));
    });

    setRecipes(processedRecipes);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/recipes" component={Recipes} exact={true} />
            <Route path="/recipes/:id" component={RecipeDetails} />
            <Route path="/ingredients" component={Ingredients} exact={true} />
            <Route path="/ingredients/:id" component={IngredientDetails} />
            <Route path="/tags" component={Tags} exact={true} />
            <Route path="/tags/:id" component={TagDetails} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/" render={() => <Redirect to="/recipes" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="recipes" href="/recipes">
              <IonIcon icon={book} />
              <IonLabel>Recipes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="ingredients" href="/ingredients">
              <IonIcon icon={nutrition} />
              <IonLabel>Ingredients</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tags" href="/tags">
              <IonIcon icon={pricetags} />
              <IonLabel>Tags</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cart" href="/cart">
              <IonIcon icon={cart} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
