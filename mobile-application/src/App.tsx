import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { book, nutrition, pricetags, cart } from 'ionicons/icons';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Ingredients from './pages/Ingredients';
import Ingredient from './pages/Ingredient';
import Tags from './pages/Tags';
import Tag from './pages/Tag';
import ShoppingCart from './pages/ShoppingCart';

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

/* Personal styling */
import './App.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/recipes" component={Recipes} exact={true} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/ingredients" component={Ingredients} exact={true} />
          <Route path="/ingredients/:id" component={Ingredient} />
          <Route path="/tags" component={Tags} exact={true} />
          <Route path="/tags/:id" component={Tag} />
          <Route path="/cart" component={ShoppingCart} />
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
          <IonTabButton tab="tags" href="/tags">
            <IonIcon icon={pricetags} />
            <IonLabel>Tags</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cart" href="/cart">
            <IonIcon icon={cart} />
            <IonLabel>Cart</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
