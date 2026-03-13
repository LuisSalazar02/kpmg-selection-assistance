import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  projectName: Yup.string().required("Requerido"),
  companyName: Yup.string().required("Requerido"),
  categories: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Requerido"),
      weight: Yup.number().typeError("Debe ser número").required("Requerido"),
      subcategories: Yup.array().of(
        Yup.object({
          name: Yup.string().required("Requerido"),
          weight: Yup.number()
            .typeError("Debe ser número")
            .required("Requerido"),
        }),
      ),
    }),
  ),
  providers: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Requerido"),
    }),
  ),
  negativeMultiplier: Yup.number()
    .typeError("Debe ser un número")
    .required("Requerido"),
});

export default function ProjectForm({ initialData, onSubmit }) {
  const defaultValues = {
    projectName: "",
    companyName: "",
    categories: [],
    providers: [],
    negativeMultiplier: 2,
  };

  return (
    <Formik
      initialValues={initialData || defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          {/* DATOS GENERALES */}
          <div className="section">
            <label>Nombre del Proyecto *</label>
            <Field name="projectName" />
            <ErrorMessage
              name="projectName"
              component="div"
              className="error-message"
            />

            <label>Nombre de Empresa *</label>
            <Field name="companyName" />
            <ErrorMessage
              name="companyName"
              component="div"
              className="error-message"
            />
          </div>

          <div className="divider" />

          {/* CATEGORÍAS */}
          <div className="section">
            <h3>Categorías</h3>
            <FieldArray name="categories">
              {({ push, remove }) => (
                <>
                  {values.categories.map((category, index) => (
                    <div key={index} className="inner-card">
                      <label>Nombre Categoría *</label>
                      <Field name={`categories.${index}.name`} />
                      <ErrorMessage
                        name={`categories.${index}.name`}
                        component="div"
                        className="error-message"
                      />

                      <label>Ponderación *</label>
                      <Field
                        name={`categories.${index}.weight`}
                        type="number"
                      />
                      <ErrorMessage
                        name={`categories.${index}.weight`}
                        component="div"
                        className="error-message"
                      />

                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => remove(index)}
                      >
                        Eliminar Categoría
                      </button>

                      <div style={{ marginTop: 20 }}>
                        <h4>Subcategorías</h4>
                        <FieldArray name={`categories.${index}.subcategories`}>
                          {({ push, remove }) => (
                            <>
                              {category.subcategories?.map((sub, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="inner-card"
                                  style={{ background: "#fff", marginTop: 15 }}
                                >
                                  <label>Nombre Subcategoría *</label>
                                  <Field
                                    name={`categories.${index}.subcategories.${subIndex}.name`}
                                  />
                                  <ErrorMessage
                                    name={`categories.${index}.subcategories.${subIndex}.name`}
                                    component="div"
                                    className="error-message"
                                  />

                                  <label>Ponderación *</label>
                                  <Field
                                    name={`categories.${index}.subcategories.${subIndex}.weight`}
                                    type="number"
                                  />
                                  <ErrorMessage
                                    name={`categories.${index}.subcategories.${subIndex}.weight`}
                                    component="div"
                                    className="error-message"
                                  />

                                  <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => remove(subIndex)}
                                  >
                                    Eliminar Subcategoría
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                className="btn-primary"
                                onClick={() => push({ name: "", weight: "" })}
                              >
                                + Añadir Subcategoría
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() =>
                      push({ name: "", weight: "", subcategories: [] })
                    }
                  >
                    + Añadir Categoría
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          <div className="divider" />

          {/* MULTIPLICADOR NEGATIVO */}
          <div className="section">
            <h3>Multiplicador Negativo</h3>
            <label>Valor *</label>
            <Field
              name="negativeMultiplier"
              type="number"
              placeholder="2"
              min="1"
            />
            <ErrorMessage
              name="negativeMultiplier"
              component="div"
              className="error-message"
            />
          </div>

          <div className="divider" />

          {/* PROVEEDORES */}
          <div className="section">
            <h3>Proveedores</h3>
            <FieldArray name="providers">
              {({ push, remove }) => (
                <>
                  {values.providers.map((provider, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                      <div className="provider-row">
                        <Field
                          name={`providers.${index}.name`}
                          placeholder="Nombre del proveedor"
                        />
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                      <ErrorMessage
                        name={`providers.${index}.name`}
                        component="div"
                        className="error-message"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => push({ name: "" })}
                  >
                    + Añadir Proveedor
                  </button>
                </>
              )}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
}
