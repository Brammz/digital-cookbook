import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonBackButton, IonButtons, IonHeader, IonPage, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonChip, IonLabel } from '@ionic/react';
import { basket } from 'ionicons/icons';
import { recipes } from './../data';

type RouteProps = RouteComponentProps<{ id?: string }>

const Recipe: React.FC<RouteProps> = ({ match }) => {
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
              return (<li key={index}>{ingredient.name.replace(/./, c => c.toUpperCase())}</li>)
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
              <IonChip key={index}>
                <IonLabel>{tag.name.replace(/./, c => c.toUpperCase())}</IonLabel>
              </IonChip>
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

export default Recipe;
