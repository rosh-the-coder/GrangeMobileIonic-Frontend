import { Student } from "./useStudents";

const useUpdateDeleteStudent = () => {
  const updateUrl = "http://localhost:8888/php_ionic/json-update-student.php";
  const deleteUrl = "http://localhost:8888/php_ionic/json-delete-student.php";

  const updateStudent = async (student: Student) => {
    try {
      const response = await fetch(updateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) throw new Error("Update failed");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error updating student:", error);
      return null;
    }
  };

  const deleteStudent = async (studentID: number) => {
    try {
      const response = await fetch(deleteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID }),
      });

      if (!response.ok) throw new Error("Delete failed");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting student:", error);
      return null;
    }
  };

  return { updateStudent, deleteStudent };
};

export default useUpdateDeleteStudent;
