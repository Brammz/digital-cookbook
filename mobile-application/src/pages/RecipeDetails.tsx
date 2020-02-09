import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonChip, IonLabel, IonRouterLink } from '@ionic/react';
import { basket } from 'ionicons/icons';
import { Recipe } from './../types';

type RouteProps = RouteComponentProps<{ id?: string }>;

type ComponentProps = {
  recipes: Recipe[]
};

type CombinedProps = RouteProps & ComponentProps;

const RecipeDetails: React.FC<CombinedProps> = ({ match, recipes }) => {
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
          <h1>Ingrediënten</h1>
          <ul>
            {recipe?.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>
                  <IonRouterLink routerLink={'/ingredients/' + ingredient.id} className="no-layout">
                    {ingredient.name.replace(/./, c => c.toUpperCase())}
                  </IonRouterLink>
                </li>
              )
            })}
          </ul>

          <hr className="divider" />

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
          <IonFabButton>
            <IonIcon icon={basket} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default RecipeDetails;
