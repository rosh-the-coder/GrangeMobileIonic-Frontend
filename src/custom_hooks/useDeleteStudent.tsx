const useDeleteStudent = () => {
  const deleteUrl = "http://localhost:8888/php_ionic/json-delete-student.php";

  const deleteStudent = async (studentID: number) => {
    try {
      const response = await fetch(deleteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID }),
      });

      if (!response.ok) {
        throw new Error("Delete request failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting student:", error);
      return null;
    }
  };

  return { deleteStudent };
};

export default useDeleteStudent;
