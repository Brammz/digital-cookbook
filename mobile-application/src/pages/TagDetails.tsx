import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { Recipe, Tag } from './../types';
import RecipesList from './RecipesList';

type RouteProps = RouteComponentProps<{ id?: string }>;

type ComponentProps = {
  recipes: Recipe[],
  tags: Tag[],
  refresh: (event: CustomEvent<RefresherEventDetail>) => void
};

type CombinedProps = RouteProps & ComponentProps;

const TagDetails: React.FC<CombinedProps> = ({ match, recipes, tags, refresh }) => {
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
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <RecipesList recipes={filteredRecipes} />
      </IonContent>
    </IonPage>
  );
};

export default TagDetails;
