// src/custom_hooks/useModules.tsx
import { useEffect, useState } from "react";

export interface Module {
  moduleNo: string;
  moduleName: string;
  credits: number;
}

const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/php_ionic/json-data-modules.php"
        );
        const result = await response.json();

        if (result.success === 1) {
          setModules(result.modules);
        } else {
          setError("No modules found");
        }
      } catch (err) {
        setError("Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return { modules, loading, error };
};

export default useModules;
