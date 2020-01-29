import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { Recipe } from './../types';

interface RecipesProps {
	recipes: Recipe[];
}

const RecipesList: React.FC<RecipesProps> = ({ recipes }) => {
  return (
		<div>
			{recipes.map((recipe, index) => {
				return (
					<IonCard key={index} routerLink={'/recipes/' + recipe.id}>
						<img src={recipe.image} alt={recipe.name} className="recipes-img" />
						<IonCardHeader className="recipes-header">
							<IonCardTitle className="recipes-title">{recipe.name}</IonCardTitle>
						</IonCardHeader>
					</IonCard>
				)
			})}
		</div>
  );
};

export default RecipesList;
