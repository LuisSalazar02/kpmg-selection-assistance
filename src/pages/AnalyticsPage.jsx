import { useState } from "react";
import axios from "axios";
import AsyncDropdown from "../components/AsyncDropdown";

export default function AnalyticsPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelect = async (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    setShowDashboard(false);

    if (!projectId) return;

    try {
      setLoading(true);

      await axios.post(process.env.REACT_APP_GENERATE_ANALYTICS_ENDPOINT, {
        projectId,
      });

      setRefreshKey((prev) => prev + 1);
      setShowDashboard(true);
    } catch (error) {
      console.error("Error actualizando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container analytics-card">
      <div className="form-title">Analítica</div>

      <div className="form-subtitle">
        Selecciona un proyecto para visualizar su dashboard.
      </div>

      <div className="divider" />

      <div className="section">
        <label>Seleccionar Proyecto:</label>

        <AsyncDropdown
          endpoint={process.env.REACT_APP_GET_PROJECTS_ENDPOINT}
          value={selectedProject}
          onChange={handleSelect}
        />
      </div>

      {loading && <div>Cargando datos del dashboard...</div>}

      {showDashboard && !loading && (
        <>
          <div className="divider" />

          <div className="analytics-dashboard">
            <iframe
              key={refreshKey}
              title="Looker Studio Dashboard"
              src={process.env.REACT_APP_DASHBOARD_URL}
              allowFullScreen
            />
          </div>
        </>
      )}
    </div>
  );
}
