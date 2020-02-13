import React, { useState }   from 'react';
import { IonPage, IonContent, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { Recipe } from './../types';
import RecipesList from './RecipesList';

type ComponentProps = {
  recipes: Recipe[],
  refresh: (event: CustomEvent<RefresherEventDetail>) => void
};

const Recipes: React.FC<ComponentProps> = ({ recipes, refresh }) => {
  const [filter, setFilter] = useState('');

  const search = (e: any) => {
    setFilter(e.target.value.toLowerCase()); 
  }

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonSearchbar onIonChange={search} debounce={0} className="recipes-searchbar" />
        <RecipesList recipes={recipes.filter(recipe => recipe.name.toLowerCase().includes(filter) || recipe.ingredients.some(ingredient => ingredient.ingredient.name.toLowerCase().includes(filter)) || recipe.tags.some(tag => tag.name.toLowerCase().includes(filter)))} />
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
