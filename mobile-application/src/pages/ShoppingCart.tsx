import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ShoppingIngredient } from './../types';

type ComponentProps = {
  shoppingList: ShoppingIngredient[]
};

const ShoppingCart: React.FC<ComponentProps> = ({ shoppingList }) => {
  console.log('shoppingList :', shoppingList);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default ShoppingCart;
