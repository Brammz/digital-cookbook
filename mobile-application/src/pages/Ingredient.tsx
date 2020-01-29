import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import RecipesList from './RecipesList';
import { recipes, ingredients } from './../data';

type RouteProps = RouteComponentProps<{ id?: string }>

const Ingredient: React.FC<RouteProps> = ({ match }) => {
  const ingredient = ingredients.find(ingredient => ingredient.id === Number(match.params.id));
  const filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(i => i.id === ingredient?.id));

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
        <RecipesList recipes={filteredRecipes} />
      </IonContent>
    </IonPage>
  );
};

export default Ingredient;
