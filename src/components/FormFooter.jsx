export default function FormFooter({
  submitting = false,
  disabled = false,
  onSubmit,
}) {
  return (
    <div className="form-footer" style={{ justifyContent: "flex-end" }}>
      <button
        className="btn-primary"
        disabled={disabled || submitting}
        onClick={onSubmit}
      >
        {submitting ? "Guardando..." : "Guardar Proyecto"}
      </button>
    </div>
  );
}
