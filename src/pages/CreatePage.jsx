import ProjectForm from "../components/ProjectForm";
import FormFooter from "../components/FormFooter";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CreatePage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_GET_BASE_WEIGHT_ENDPOINT,
        );

        const normalizedCategories = (response.data || []).map((cat) => ({
          name: cat.name || "",
          weight: cat.weight || "",
          subcategories: (cat.subcategories || []).map((sub) => ({
            name: sub.name || "",
            weight: sub.weight || "",
          })),
        }));

        setInitialData({
          projectName: "",
          companyName: "",
          categories: normalizedCategories,
          providers: [],
          negativeMultiplier: 2,
        });
      } catch (error) {
        console.error("Error obteniendo categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setSubmitting(true);

      await axios.post(process.env.REACT_APP_CREATE_PROJECT_ENDPOINT, values, {
        headers: { "Content-Type": "application/json" },
      });

      resetForm({
        values: {
          projectName: "",
          companyName: "",
          categories: [],
          providers: [],
          negativeMultiplier: 2,
        },
      });
    } catch (error) {
      console.error("Error enviando datos:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Cargando formulario...</div>;

  return (
    <div className="form-container">
      <div className="form-title">Crear Proyecto</div>
      <div className="form-subtitle">
        Utiliza este formulario para registrar un nuevo proyecto.
      </div>

      <div className="divider" />

      {initialData && (
        <>
          <ProjectForm initialData={initialData} onSubmit={handleSubmit} />
          <FormFooter
            submitting={submitting}
            onSubmit={() => document.querySelector("form")?.requestSubmit()}
          />
        </>
      )}
    </div>
  );
}
