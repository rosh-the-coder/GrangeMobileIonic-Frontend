// src/pages/ModulesPage.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonButton,
} from "@ionic/react";
import useModules from "../custom_hooks/useModules";

const ModulesPage: React.FC = () => {
  const { modules, loading, error } = useModules();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modules</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <IonSpinner name="dots" style={{ margin: "1rem" }} />}
        {error && (
          <IonItem color="danger">
            <IonLabel>{error}</IonLabel>
          </IonItem>
        )}

        <IonList>
          {modules.map((mod) => (
            <IonItem key={mod.moduleNo}>
              <IonLabel>
                <h2>
                  {mod.moduleNo} - {mod.moduleName}
                </h2>
                <p>Credits: {mod.credits}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" routerLink="/">
          Back to Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ModulesPage;
