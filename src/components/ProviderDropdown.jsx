import { useState, useEffect } from "react";
import axios from "axios";

export default function ProviderDropdown({
  projectId,
  value,
  onChange,
  placeholder = "-- Seleccionar --",
}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setProviders([]);
      return;
    }

    const fetchProviders = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          process.env.REACT_APP_GET_PROVIDERS_ENDPOINT,
          {
            projectId: projectId,
          },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        setProviders(response.data || []);
      } catch (error) {
        console.error("Error cargando proveedores:", error);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [projectId]);

  if (!projectId) {
    return <div>Selecciona un proyecto primero</div>;
  }

  if (loading) {
    return <div>Cargando proveedores...</div>;
  }

  return (
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>

      {providers.map((provider) => (
        <option key={provider} value={provider}>
          {provider}
        </option>
      ))}
    </select>
  );
}
