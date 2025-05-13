// src/pages/LecturersPage.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const LecturersPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lecturers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>This is the Lecturers Page. Backend integration coming soon!</p>
      </IonContent>
    </IonPage>
  );
};

export default LecturersPage;
