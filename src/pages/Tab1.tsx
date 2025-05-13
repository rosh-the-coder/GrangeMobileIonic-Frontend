import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useStudents from "../custom_hooks/useStudents";
import { Student } from "../custom_hooks/useStudents";

const Tab1: React.FC = () => {
  const { students, loading, error } = useStudents();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Students</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/add-student">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonContent fullscreen>
        {loading && <IonSpinner name="dots" style={{ margin: "1rem" }} />}
        {error && (
          <IonItem color="danger">
            <IonLabel>{error}</IonLabel>
          </IonItem>
        )}

        <IonList>
          {students.map((student: Student) => (
            <IonItem key={student.studentID}>
              <IonLabel>
                {student.studentID} - {student.firstName} {student.lastName}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
