import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { book, nutrition, pricetags, cart } from 'ionicons/icons';
import { Recipe, IngredientInRecipe, Ingredient, Tag, ShoppingIngredient } from './types';
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
  const [shoppingList, setShoppingList] = useState(Array<ShoppingIngredient>());

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

    setRecipes(processedRecipes);
  }

  function addToCart(items: IngredientInRecipe[], persons: number) {
    let newShoppingList = [...shoppingList];

    items.forEach(item => {
      let existingItem = newShoppingList.find(sli => sli.id === item.ingredient.id && sli.unit === item.unit);
      if (!existingItem) {
        newShoppingList.push(new ShoppingIngredient(item.ingredient.id, item.ingredient.name, (item.amount / 4 * persons), item.unit));
      } else {
        existingItem.addAmount(item.amount / 4 * persons);
      }
    });

    setShoppingList(newShoppingList);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/recipes" exact={true} render={() => <Recipes recipes={recipes} />} />
            <Route path="/recipes/:id" exact={true} render={(props) => <RecipeDetails {...props} recipes={recipes} addToCart={addToCart} />} />
            <Route path="/ingredients" exact={true} render={() => <Ingredients ingredients={ingredients} />} />
            <Route path="/ingredients/:id" exact={true} render={(props) => <IngredientDetails {...props} recipes={recipes} ingredients={ingredients} />} />
            <Route path="/tags" exact={true} render={() => <Tags tags={tags} />} />
            <Route path="/tags/:id" exact={true} render={(props) => <TagDetails {...props} recipes={recipes} tags={tags} />} />
            <Route path="/cart" exact={true} render={() => <ShoppingCart shoppingList={shoppingList} />} />
            <Route path="/" exact={true} render={() => <Redirect to="/recipes" />} />
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
