import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">KPMG</div>

      <nav>
        <NavLink to="/create" className="nav-item">
          Crear Proyecto
        </NavLink>

        <NavLink to="/edit-project" className="nav-item">
          Editar Proyecto
        </NavLink>

        <NavLink to="/edit-provider" className="nav-item">
          Editar Proveedor
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          Analítica
        </NavLink>
      </nav>
    </div>
  );
}
