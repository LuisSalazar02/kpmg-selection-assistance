export default function StepFooter({
  showBack = false,
  showNext = false,
  showSave = false,
  onBack,
  onNext,
  onSave,
  disableNext = false,
  disableSave = false,
  loading = false,
}) {
  return (
    <div className="form-footer">
      <div>
        {showBack && (
          <button className="btn-secondary" onClick={onBack}>
            Regresar
          </button>
        )}
      </div>

      <div>
        {showNext && (
          <button
            className="btn-primary"
            disabled={disableNext}
            onClick={onNext}
          >
            Siguiente
          </button>
        )}

        {showSave && (
          <button
            className="btn-primary"
            disabled={disableSave || loading}
            onClick={onSave}
          >
            {loading ? "Guardando..." : "Guardar Proveedor"}
          </button>
        )}
      </div>
    </div>
  );
}
