import { useState } from "react";
import axios from "axios";
import StepFooter from "../components/StepFooter";
import AsyncDropdown from "../components/AsyncDropdown";
import ProviderDropdown from "../components/ProviderDropdown";

export default function EditProviderPage() {
  const [step, setStep] = useState(1);

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const [providerData, setProviderData] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(false);

  const resetPage = () => {
    setStep(1);
    setSelectedProject("");
    setSelectedProvider("");
    setProviderData(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProjectSelect = (e) => {
    const projectId = e.target.value;

    setSelectedProject(projectId);
    setSelectedProvider("");
    setProviderData(null);
  };

  const handleProviderSelect = async (e) => {
    const providerId = e.target.value;

    setSelectedProvider(providerId);

    if (!providerId) {
      setProviderData(null);
      return;
    }

    try {
      setLoadingProvider(true);

      const response = await axios.post(
        process.env.REACT_APP_GET_PROVIDER_INFO_ENDPOINT,
        {
          projectId: selectedProject,
          providerId: providerId,
        },
      );

      setProviderData(response.data);
    } catch (error) {
      console.error("Error obteniendo proveedor:", error);
      setProviderData(null);
    } finally {
      setLoadingProvider(false);
    }
  };

  const handleScoreChange = (catIndex, subIndex, value) => {
    const updated = { ...providerData };

    updated.categories[catIndex].subcategories[subIndex].score = value;

    setProviderData(updated);
  };

  const handleAdditionalChange = (index, field, value) => {
    const updated = { ...providerData };

    updated.additional[index][field] = value;

    setProviderData(updated);
  };

  const addAdditional = () => {
    const updated = { ...providerData };

    updated.additional.push({
      description: "",
      score: "",
    });

    setProviderData(updated);
  };

  const removeAdditional = (index) => {
    const updated = { ...providerData };

    updated.additional.splice(index, 1);

    setProviderData(updated);
  };

  const handleSave = async () => {
    if (!providerData) return;

    const payload = {
      projectId: selectedProject,
      provider_data: providerData,
    };

    try {
      await axios.post(process.env.REACT_APP_EDIT_PROVIDER_ENDPOINT, payload);

      resetPage();
    } catch (error) {
      console.error("Error actualizando proveedor:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Editar Proveedor</div>

      <div className="form-subtitle">
        Modifica las consideraciones del proveedor.
      </div>

      <div className="divider" />

      {step === 1 && (
        <>
          <label>Seleccionar Proyecto:</label>

          <AsyncDropdown
            endpoint={process.env.REACT_APP_GET_PROJECTS_ENDPOINT}
            value={selectedProject}
            onChange={handleProjectSelect}
          />

          <StepFooter
            showNext
            disableNext={!selectedProject}
            onNext={() => setStep(2)}
          />
        </>
      )}

      {step === 2 && (
        <>
          <div className="section">
            <label>Seleccionar Proveedor:</label>

            <ProviderDropdown
              projectId={selectedProject}
              value={selectedProvider}
              onChange={handleProviderSelect}
            />
          </div>

          {loadingProvider && <div>Cargando proveedor...</div>}

          {providerData && !loadingProvider && (
            <>
              <div className="divider" />

              <div className="section">
                <label>Nombre de Proveedor</label>

                <input type="text" value={providerData.providerId} disabled />
              </div>

              <div className="section">
                <h3>Consideraciones Base</h3>

                {providerData.categories.map((cat, catIndex) => (
                  <div key={catIndex} className="inner-card">
                    <h4>
                      <strong>Categoría:</strong> {cat.name}
                    </h4>

                    <div className="base-label-row">
                      <label>Subcategoría</label>
                      <label>Puntaje</label>
                    </div>

                    {cat.subcategories.map((sub, subIndex) => (
                      <div key={subIndex} className="base-row">
                        <div className="base-subcategory">{sub.name}</div>

                        <input
                          type="number"
                          step="any"
                          className="base-score"
                          value={sub.score}
                          onChange={(e) =>
                            handleScoreChange(
                              catIndex,
                              subIndex,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="section">
                <h3>Consideraciones Adicionales</h3>

                {providerData.additional.map((item, index) => (
                  <div key={index} className="additional-row">
                    <textarea
                      rows={2}
                      className="additional-description"
                      value={item.description}
                      onChange={(e) =>
                        handleAdditionalChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      type="number"
                      step="any"
                      className="additional-score"
                      value={item.score}
                      onChange={(e) =>
                        handleAdditionalChange(index, "score", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => removeAdditional(index)}
                    >
                      X
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn-primary"
                  onClick={addAdditional}
                >
                  + Agregar consideración
                </button>
              </div>
            </>
          )}

          <StepFooter
            showBack
            showSave
            disableSave={!providerData}
            onBack={() => setStep(1)}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
}
