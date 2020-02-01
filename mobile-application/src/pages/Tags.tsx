import React from 'react';
import { IonContent, IonHeader, IonItemGroup, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { tags } from './../data';

const Tags: React.FC = () => {
  let alphabeticTagList = Array<Object>();
  let currentGroup = Array<Object>();
  let currentLetter = '';
  tags.sort((a,b) => a.name > b.name ? 1 : -1).forEach((tag, index) => {
    if (tag.name.charAt(0) !== currentLetter) {
      if (index !== 0) {
        alphabeticTagList.push(
          <IonItemGroup key={currentLetter}>
            {currentGroup}
          </IonItemGroup>
        );
      }
      currentLetter = tag.name.charAt(0);
      currentGroup = Array<Object>();
      currentGroup.push(
        <IonItemDivider key={currentLetter}>
          <IonLabel>
            {currentLetter.toUpperCase()}
          </IonLabel>
        </IonItemDivider>
      )
    }
    currentGroup.push(
      <IonItem key={index} routerLink={'/tags/' + tag.id}>
        <IonLabel>
          {tag.name.replace(/./, c => c.toUpperCase())}
        </IonLabel>
      </IonItem>
    );
  });
  alphabeticTagList.push(
    <IonItemGroup key={currentLetter}>
      {currentGroup}
    </IonItemGroup>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tags</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {alphabeticTagList}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tags;