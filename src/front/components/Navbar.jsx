import React, { useState, useEffect } from "react";

export const Navbar = () => {
  // Estado para controlar el modo oscuro
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png"
            alt="Logo"
            width="30"
            height="24"
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
          <form className="d-flex w-50 justify-content-center" role="search">
            <input
              className="form-control border-end-0 flex-grow-1"
              type="search"
              placeholder="Buscar"
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
            <li className="nav-item dropdown left-aligned">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Menú
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Inicio</a></li>
                <li><a className="dropdown-item" href="#">Productos Favoritos</a></li>
                <li><a className="dropdown-item" href="#">Perfil</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#">Cerrar Sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};