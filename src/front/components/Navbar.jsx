import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src="https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png"
            alt="Logo"
            width="50"
            height="50"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <form className="d-flex w-50 justify-content-center" role="search" onSubmit={handleSearch}>
            <input
              className="form-control border-end-0 flex-grow-1"
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light border-0" type="submit">
              Buscar
            </button>
          </form>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label text-white" htmlFor="darkModeSwitch">
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </label>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Menú
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={() => navigate("/")}>Inicio</button></li>
                <li><button className="dropdown-item" onClick={() => navigate("/favorites")}>Productos Favoritos</button></li>
                <li><button className="dropdown-item" onClick={() => navigate("/user")}>Perfil</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};