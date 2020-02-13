import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { Recipe, Ingredient } from './../types';
import RecipesList from './RecipesList';

type RouteProps = RouteComponentProps<{ id?: string }>;

type ComponentProps = {
  recipes: Recipe[],
  ingredients: Ingredient[],
  refresh: (event: CustomEvent<RefresherEventDetail>) => void
};

type CombinedProps = RouteProps & ComponentProps;

const IngredientDetails: React.FC<CombinedProps> = ({ match, recipes, ingredients, refresh }) => {
  const ingredient = ingredients.find(ingredient => ingredient.id === Number(match.params.id));
  const filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(i => i.ingredient.id === ingredient?.id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ingredients" />
          </IonButtons>
          <IonTitle>{ingredient?.name.replace(/./, c => c.toUpperCase())}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <RecipesList recipes={filteredRecipes} />
      </IonContent>
    </IonPage>
  );
};

export default IngredientDetails;
