import React, { useState }   from 'react';
import { IonPage, IonContent,IonSearchbar, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import recipes from './../recipes';
import './Recipes.css';

const Recipes: React.FC = () => {
  const [filter, setFilter] = useState('');

  const search = (e: any) => {
    setFilter(e.target.value.toLowerCase()); 
  }

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar onIonChange={search} debounce={0} className="recipe-searchbar" />
        {recipes.filter(recipe => recipe.name.toLowerCase().includes(filter) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(filter)) || recipe.tags.some(tag => tag.toLowerCase().includes(filter))).map((recipe, index) => {
          return (
            <IonCard key={recipe.id} routerLink="/recipes/details">
              <img src={recipe.image} alt={recipe.name} className="recipe-img" />
              <IonCardHeader className="recipe-header">
                <IonCardTitle className="recipe-title">{recipe.name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
