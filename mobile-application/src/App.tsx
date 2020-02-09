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
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);

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

    let ingredientsHeaders = (ingredientsResponse?.data?.values || [])[0];
    let ingredientsRows = (ingredientsResponse?.data?.values || []).slice(1);

    let processedIngredients = Array<Object>();

    ingredientsRows.forEach(ingredient => {
      let processed = ingredient.reduce((acc, curr, i) => {
        if (ingredientsHeaders[i] === 'id') {
          acc[ingredientsHeaders[i]] = Number(curr);
        } else {
          acc[ingredientsHeaders[i]] = curr;
        }
        return acc;
      }, {});
      processedIngredients.push(processed);
    });

    console.log('processedIngredients :', processedIngredients);

    // fetch tags
    const tagsResponse = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: credentials.sheet_id,
        range: 'Tags',
        majorDimension: 'ROWS'
    });

    let tagsHeaders = (tagsResponse?.data?.values || [])[0];
    let tagsRows = (tagsResponse?.data?.values || []).slice(1);

    let processedTags = Array<Object>();

    tagsRows.forEach(tag => {
      let processed = tag.reduce((acc, curr, i) => {
        if (ingredientsHeaders[i] === 'id') {
          acc[tagsHeaders[i]] = Number(curr);
        } else {
          acc[tagsHeaders[i]] = curr;
        }
        return acc;
      }, {});
      processedTags.push(processed);
    });

    console.log('processedTags :', processedTags);

    // fetch recipes
    const recipesResponse = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: credentials.sheet_id,
        range: 'Recipes',
        majorDimension: 'ROWS'
    });

    let recipesHeaders = (recipesResponse?.data?.values || [])[0];
    let recipesRows = (recipesResponse?.data?.values || []).slice(1);

    let processedRecipes = Array<Object>();

    recipesRows.forEach(recipe => {
      let processed = recipe.reduce((acc, curr, i) => {
        if (recipesHeaders[i] === 'ingredients') {
          let ingrs = JSON.parse(curr);
          ingrs.forEach((ingr: any) => {
            ingr.name = processedIngredients.find((pi: any) => pi.id === ingr.id);
          });
          acc[recipesHeaders[i]] = ingrs;
        } else if (recipesHeaders[i] === 'tags') {
          acc[recipesHeaders[i]] = JSON.parse(curr);
        } else {
          acc[recipesHeaders[i]] = curr;
        }
        return acc;
      }, {});
      processedRecipes.push(processed);
    });

    console.log('processedRecipes :', processedRecipes);
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
