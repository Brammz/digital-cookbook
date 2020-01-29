import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { ingredients } from './../data';

type RouteProps = RouteComponentProps<{ id?: string }>

const Ingredient: React.FC<RouteProps> = ({ match }) => {
  const ingredient = ingredients.find(ingredient => ingredient.id === Number(match.params.id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ingredients" />
          </IonButtons>
          <IonTitle>Ingredient {ingredient?.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Details</p>
      </IonContent>
    </IonPage>
  );
};

export default Ingredient;
