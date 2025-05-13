import { Student } from "./useStudents";

const useCreateStudent = () => {
  const url = "http://localhost:8888/php_ionic/json-create-students.php";

  const postStudent = async (student: Student) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Student added:", result);
      return result;
    } catch (err) {
      console.error("Error posting student:", err);
      return null;
    }
  };

  return { postStudent };
};

export default useCreateStudent;
