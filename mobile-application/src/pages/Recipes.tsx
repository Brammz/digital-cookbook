import React, { useState }   from 'react';
import { IonPage, IonContent, IonSearchbar } from '@ionic/react';
import { Recipe } from './../types';
import RecipesList from './RecipesList';

type ComponentProps = {
  recipes: Recipe[]
};

const Recipes: React.FC<ComponentProps> = ({ recipes }) => {
  const [filter, setFilter] = useState('');

  const search = (e: any) => {
    setFilter(e.target.value.toLowerCase()); 
  }

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar onIonChange={search} debounce={0} className="recipes-searchbar" />
        <RecipesList recipes={recipes.filter(recipe => recipe.name.toLowerCase().includes(filter) || recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(filter)) || recipe.tags.some(tag => tag.name.toLowerCase().includes(filter)))} />
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
