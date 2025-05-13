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
  IonButton,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useStudents from "../custom_hooks/useStudents";
import { Student } from "../custom_hooks/useStudents";
import useDeleteStudent from "../custom_hooks/useDeleteStudent";

const Tab1: React.FC = () => {
  const { students, loading, error } = useStudents();
  const { deleteStudent } = useDeleteStudent();

  const handleDelete = async (studentID: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      const result = await deleteStudent(studentID);
      if (result?.success === 1) {
        alert("Student deleted successfully!");
        window.location.reload(); // Simple refresh to update list
      } else {
        alert("Failed to delete student.");
      }
    }
  };

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
              <IonButton
                slot="end"
                color="warning"
                routerLink={`/edit-student/${student.studentID}`}
              >
                Edit
              </IonButton>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => handleDelete(student.studentID)}
              >
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
