import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCheckbox, IonButtons, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { ShoppingIngredient } from './../types';

type ComponentProps = {
  shoppingList: ShoppingIngredient[],
  clearShoppingList: () => void
};

const ShoppingCart: React.FC<ComponentProps> = ({ shoppingList, clearShoppingList }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping Cart</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearShoppingList}>
              <IonIcon icon={trash}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {shoppingList.length === 0 ? (
          <IonGrid class="maxheight">
            <IonRow class="center">
              <i>Shopping list is empty.</i>
            </IonRow>
          </IonGrid>
        ) : (
          <IonList>
            {shoppingList.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map((ingredient, index) => {
              return (
                <IonItem key={index}>
                  <IonCheckbox />
                  <IonLabel>
                    {(() => {
                      let amount = Math.round(((ingredient.amount) + Number.EPSILON) * 100) / 100;
                      switch(ingredient.unit) {
                        case '#': return `${amount}`;
                        default: return `${amount}${ingredient.unit}`;
                      }
                    })()}
                    &nbsp;
                    {ingredient.name.toLowerCase()}
                  </IonLabel>
                </IonItem>
              )
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShoppingCart;
