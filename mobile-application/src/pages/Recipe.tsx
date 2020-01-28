import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent } from '@ionic/react';

type MyProps = RouteComponentProps<{ id?: string }>

const Recipe: React.FC<MyProps> = ({ match }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/recipes" />
          </IonButtons>
          <IonTitle>Recipe {match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Details</p>
      </IonContent>
    </IonPage>
  );
};

export default Recipe;
