import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { book, nutrition, informationCircleOutline } from 'ionicons/icons';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Ingredients from './pages/Ingredients';
import Ingredient from './pages/Ingredient';
import About from './pages/About';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/recipes" component={Recipes} exact={true} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/ingredients" component={Ingredients} exact={true} />
          <Route path="/ingredients/details" component={Ingredient} />
          <Route path="/about" component={About} />
          <Route path="/" render={() => <Redirect to="/recipes" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="recipes" href="/recipes">
            <IonIcon icon={book} />
            <IonLabel>Recipes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ingredients" href="/ingredients">
            <IonIcon icon={nutrition} />
            <IonLabel>Ingredients</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
