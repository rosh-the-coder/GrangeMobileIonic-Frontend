import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import useStudents, { Student } from "../custom_hooks/useStudents";
import useUpdateStudent from "../custom_hooks/useUpdateDeleteStudent";

const EditStudent: React.FC = () => {
  const { studentID } = useParams<{ studentID: string }>();
  const { students, loading } = useStudents();
  const { updateStudent } = useUpdateStudent();
  const history = useHistory();

  const [student, setStudent] = useState<Student>({
    studentID: parseInt(studentID),
    firstName: "",
    lastName: "",
    moduleNo1: 0,
    moduleNo2: 0,
    courseID: 0,
  });

  // Pre-fill student from students array
  useEffect(() => {
    const found = students.find(
      (s: Student) => s.studentID === parseInt(studentID)
    );
    if (found) setStudent(found);
  }, [students, studentID]);

  const handleChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = e.detail.value;
    const numeric = ["studentID", "moduleNo1", "moduleNo2", "courseID"];

    setStudent((prev) => ({
      ...prev,
      [name]: numeric.includes(name) ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    const result = await updateStudent(student);
    if (result?.success === 1) {
      alert("Student updated!");
      history.push("/students");
    } else {
      alert("Update failed.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <IonSpinner name="dots" />
        ) : (
          <>
            {[
              "studentID",
              "firstName",
              "lastName",
              "moduleNo1",
              "moduleNo2",
              "courseID",
            ].map((field) => (
              <IonItem key={field}>
                <IonLabel position="stacked">{field}</IonLabel>
                <IonInput
                  type="text"
                  name={field}
                  value={(student as any)[field]}
                  onIonInput={handleChange}
                />
              </IonItem>
            ))}
            <IonButton expand="full" onClick={handleSubmit}>
              Update Student
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditStudent;
