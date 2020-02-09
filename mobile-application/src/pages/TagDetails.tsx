import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { Recipe, Tag } from './../types';
import RecipesList from './RecipesList';

type RouteProps = RouteComponentProps<{ id?: string }>;

type ComponentProps = {
  recipes: Recipe[],
  tags: Tag[]
};

type CombinedProps = RouteProps & ComponentProps;

const TagDetails: React.FC<CombinedProps> = ({ match, recipes, tags }) => {
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

export default TagDetails;
