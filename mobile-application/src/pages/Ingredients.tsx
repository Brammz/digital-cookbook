import React from 'react';
import { IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ingredients } from './../data';

const Ingredients: React.FC = () => {
  const alphabeticIngredientList = Array<Object>();

  let currentLetter = '';
  ingredients.sort((a,b) => a.name > b.name ? 1 : -1).forEach((ingredient, index) => {
    if (ingredient.name.charAt(0) !== currentLetter) {
      currentLetter = ingredient.name.charAt(0);
      alphabeticIngredientList.push(
        <IonItemDivider key={index}>
          <IonLabel>
            {currentLetter.toUpperCase()}
          </IonLabel>
        </IonItemDivider>
      )
    }
    alphabeticIngredientList.push(
      <IonItem key={index} routerLink={'/ingredients/' + ingredient.id}>
        <IonLabel>
          {ingredient.name.replace(/./, c => c.toUpperCase())}
        </IonLabel>
      </IonItem>
    );
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingredients</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {alphabeticIngredientList}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;