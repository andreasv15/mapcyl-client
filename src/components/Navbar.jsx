import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <NavLink className="nav-link active" to="/">Ciudades</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link active" to="/signup" end={true}>Registro</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link active" to="/login" end={true}>Acceder</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link active" to="/restaurantes/add-restaurante" end={true}>Añadir restaurante </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

        {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
              <NavLink to="/">Ciudades</NavLink>
              <NavLink to="/signup" end={true}>Registro</NavLink>
              <NavLink to="/login" end={true}>Acceder</NavLink>
              
              <NavLink to="/restaurantes/add-restaurante" end={true}>Añadir restaurante </NavLink>

          </div>
        </nav> */}
    </div>
  )
}

export default Navbar