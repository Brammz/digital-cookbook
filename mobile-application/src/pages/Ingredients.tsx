import React from 'react';
import { IonContent, IonHeader, IonItemGroup, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Ingredient } from './../types';

type ComponentProps = {
  ingredients: Ingredient[]
};

const Ingredients: React.FC<ComponentProps> = ({ ingredients }) => {
  let alphabeticIngredientList = Array<Object>();
  let currentGroup = Array<Object>();
  let currentLetter = '';
  ingredients.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).forEach((ingredient, index) => {
    if (ingredient.name.charAt(0).toUpperCase() !== currentLetter) {
      if (index !== 0) {
        alphabeticIngredientList.push(
          <IonItemGroup key={currentLetter}>
            {currentGroup}
          </IonItemGroup>
        );
      }
      currentLetter = ingredient.name.charAt(0).toUpperCase();
      currentGroup = Array<Object>();
      currentGroup.push(
        <IonItemDivider key={currentLetter}>
          <IonLabel>
            {currentLetter}
          </IonLabel>
        </IonItemDivider>
      )
    }
    currentGroup.push(
      <IonItem key={index} routerLink={'/ingredients/' + ingredient.id}>
        <IonLabel>
          {ingredient.name.replace(/./, c => c.toUpperCase())}
        </IonLabel>
      </IonItem>
    );
  });
  alphabeticIngredientList.push(
    <IonItemGroup key={currentLetter}>
      {currentGroup}
    </IonItemGroup>
  );

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
