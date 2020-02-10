import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonButton, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
          IonChip, IonLabel, IonRouterLink, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react';
import { basket, removeCircle, addCircle } from 'ionicons/icons';
import { Recipe, IngredientInRecipe } from './../types';

type RouteProps = RouteComponentProps<{ id?: string }>;

type ComponentProps = {
  recipes: Recipe[],
  addToCart: (items: IngredientInRecipe[], persons: number) => void;
};

type CombinedProps = RouteProps & ComponentProps;

const RecipeDetails: React.FC<CombinedProps> = ({ match, recipes, addToCart }) => {
  const [persons, setPersons] = useState(2);
  const recipe = recipes.find(recipe => recipe.id === Number(match.params.id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/recipes" />
          </IonButtons>
          <IonTitle>{recipe?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <img src={recipe?.image} alt={recipe?.name} className="recipe-img" />
        <div className="text-container">
          {recipe?.ingredients.length !== 0 && (
            <>
              <h1>Ingrediënten</h1>
              <IonGrid>
                <IonRow>
                  <IonCol size="2" className="no-padding"></IonCol>
                  <IonCol size="8" className="no-padding">
                    <IonItem lines="none">
                      <IonButton size="large" fill="clear" onClick={() => setPersons(persons-1)}>
                        <IonIcon icon={removeCircle} />
                      </IonButton>
                      <span>&nbsp;&nbsp;&nbsp;{persons}&nbsp;&nbsp;&nbsp;</span>
                      <IonButton size="large" fill="clear" onClick={() => setPersons(persons+1)}>
                        <IonIcon icon={addCircle} />
                      </IonButton>
                    </IonItem>
                  </IonCol>
                  <IonCol size="2" className="no-padding"></IonCol>
                </IonRow>
                {recipe?.ingredients.sort((a,b) => a.ingredient.name.toLowerCase() > b.ingredient.name.toLowerCase() ? 1 : -1).map((ingredient, index) => {
                  return (
                    <IonRouterLink key={index} routerLink={'/ingredients/' + ingredient.ingredient.id} className="no-layout">
                      <IonRow className={recipe?.ingredients.length-1 !== index ? "ingredient-row row-border" : "ingredient-row"}>
                        <IonCol>
                          {ingredient.ingredient.name.replace(/./, c => c.toUpperCase())}
                        </IonCol>
                        <IonCol className="text-right">
                          {(() => {
                            let amount = Math.round(((ingredient.amount / 4 * persons) + Number.EPSILON) * 100) / 100;
                            switch(ingredient.unit) {
                              case '#': return `${amount}`;
                              default: return `${amount}${ingredient.unit}`;
                            }
                          })()}
                        </IonCol>
                      </IonRow>
                    </IonRouterLink>
                  )
                })}
              </IonGrid>

              <hr className="divider" />
            </>
          )}

          <h1>Bereiding</h1>
          <ol>
            {recipe?.preparation.split('>').map((step, index) => {
              return (<li key={index}>{step}</li>)
            })}
          </ol>

          <hr className="divider" />

          {recipe?.tags.map((tag, index) => {
            return (
              <IonRouterLink key={index} routerLink={'/tags/' + tag.id} className="no-layout">
                <IonChip>
                  <IonLabel>{tag.name.replace(/./, c => c.toUpperCase())}</IonLabel>
                </IonChip>
              </IonRouterLink>
            )
          })}
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => addToCart(recipe?.ingredients || new Array<IngredientInRecipe>(), persons)}>
            <IonIcon icon={basket} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default RecipeDetails;
