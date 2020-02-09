import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import RecipesList from './RecipesList';
import { recipes, tags } from './../data';

type RouteProps = RouteComponentProps<{ id?: string }>

const Tag: React.FC<RouteProps> = ({ match }) => {
  const tag = tags.find(tag => tag.id === Number(match.params.id));
  const filteredRecipes = recipes.filter(recipe => recipe.tags.some(t => t.id === tag?.id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tags" />
          </IonButtons>
          <IonTitle>{tag?.name.replace(/./, c => c.toUpperCase())}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RecipesList recipes={filteredRecipes} />
      </IonContent>
    </IonPage>
  );
};

export default Tag;
