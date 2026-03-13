import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import AsyncDropdown from "../components/AsyncDropdown";
import FormFooter from "../components/FormFooter";
import axios from "axios";

export default function EditProjectPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [projectData, setProjectData] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = async (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);

    if (!projectId) {
      setProjectData(null);
      return;
    }

    try {
      setLoadingProject(true);

      const response = await axios.post(
        process.env.REACT_APP_GET_PROJECT_INFO_ENDPOINT,
        { projectId },
      );

      setProjectData(response.data);
    } catch (error) {
      console.error("Error obteniendo proyecto:", error);
      setProjectData(null);
    } finally {
      setLoadingProject(false);
    }
  };

  const handleSubmit = async (values) => {
    if (!selectedProject) return;

    try {
      setSubmitting(true);

      const payload = {
        projectId: selectedProject,
        projectName: values.projectName,
        companyName: values.companyName,
        categories: values.categories,
        providers: values.providers,
        negativeMultiplier: values.negativeMultiplier,
      };

      await axios.post(process.env.REACT_APP_EDIT_PROJECT_ENDPOINT, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setProjectData(null);
      setSelectedProject("");
    } catch (error) {
      console.error("Error guardando proyecto:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Editar Proyecto</div>

      <div className="form-subtitle">Selecciona un proyecto existente.</div>

      <div className="divider" />

      <div className="section">
        <label>Seleccionar Proyecto:</label>

        <AsyncDropdown
          endpoint={process.env.REACT_APP_GET_PROJECTS_ENDPOINT}
          value={selectedProject}
          onChange={handleSelect}
        />
      </div>

      {loadingProject && <div>Cargando proyecto...</div>}

      {selectedProject && projectData && !loadingProject && (
        <>
          <div className="divider" />

          <ProjectForm initialData={projectData} onSubmit={handleSubmit} />

          <FormFooter
            submitting={submitting}
            onSubmit={() => document.querySelector("form")?.requestSubmit()}
          />
        </>
      )}
    </div>
  );
}
