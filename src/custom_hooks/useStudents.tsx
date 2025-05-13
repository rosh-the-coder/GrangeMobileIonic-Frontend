import { useState, useEffect } from "react";

export interface Student {
  studentID: number;
  firstName: string;
  lastName: string;
  moduleNo1: number;
  moduleNo2: number;
  courseID: number;
}

function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = `http://localhost:8888/php_ionic/json-data-students.php`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { students, loading, error };
}

export default useStudents;
