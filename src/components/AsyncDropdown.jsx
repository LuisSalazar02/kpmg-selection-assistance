import { useState, useEffect } from "react";
import axios from "axios";

export default function AsyncDropdown({
  endpoint,
  value,
  onChange,
  labelKey = "projectName",
  valueKey = "projectId",
  placeholder = "-- Seleccionar --",
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(endpoint);
        setOptions(response.data || []);
      } catch (error) {
        console.error("Error cargando opciones:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [endpoint]);

  if (loading) {
    return <div>Cargando opciones...</div>;
  }

  return (
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>

      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
