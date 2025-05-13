import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useCreateStudent from "../custom_hooks/useCreateStudent";

const AddStudent: React.FC = () => {
  const { postStudent } = useCreateStudent();
  const history = useHistory();

  const [newStudent, setNewStudent] = useState({
    studentID: 0,
    firstName: "",
    lastName: "",
    moduleNo1: 0,
    moduleNo2: 0,
    courseID: 0,
  });

  const handleInputChange = (e: CustomEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = e.detail.value;

    const numericFields = ["studentID", "moduleNo1", "moduleNo2", "courseID"];
    setNewStudent({
      ...newStudent,
      [name]: numericFields.includes(name) ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting student:", newStudent);

    const result = await postStudent(newStudent);
    console.log("Result from server:", result);

    if (result && result.success === 1) {
      console.log("Redirecting...");
      history.push("/students");
    } else {
      alert("Failed to add student. Check input or PHP server.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {[
            "studentID",
            "firstName",
            "lastName",
            "moduleNo1",
            "moduleNo2",
            "courseID",
          ].map((field) => (
            <IonItem key={field}>
              <IonLabel position="floating">{field}</IonLabel>
              <IonInput
                type="text"
                name={field}
                value={(newStudent as any)[field]}
                onIonInput={handleInputChange}
              />
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="full" onClick={handleSubmit}>
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddStudent;
