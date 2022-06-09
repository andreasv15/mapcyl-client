import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function Navbar() {

  const { isLoggedIn, user, authenticateUser, userAdmin } = useContext(AuthContext);

  const navigate = useNavigate();
  // console.log(isLoggedIn);
  // console.log(user);
  // console.log(userAdmin)
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser();
    navigate("/")
  }

  return (
    <div>
    
    { userAdmin === true && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "yellow"}}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <NavLink className="nav-link active" to="/">Ciudades</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-link active" to="/restaurantes/add-restaurante" end={true}>Añadir restaurante </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-link active" to="/profile">Mi perfil</NavLink>
                </li>

              </ul>
              {/* { user !== null && <p> Bienvenid@: {user.nombre} </p> } */}
              <button onClick={handleLogout} className="btn btn-danger"> Cerrar sesión </button>
            </div>
          </div>
        </nav>
      )
    }

    {
      (isLoggedIn === true && userAdmin === false) && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "yellow"}}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">Ciudades</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-link active" to="/profile">Mi perfil</NavLink>
                </li>

                {/* { user !== null && (<p> Bienvenid@: {user.nombre} </p>) }  */}

              </ul>
              <button onClick={handleLogout} className="btn btn-danger"> Cerrar sesión </button>
            </div>
          </div>
        </nav>
      )
    }

    {
      isLoggedIn === false && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Ciudades</NavLink>
              </li>
              <li className="nav-item">
               <NavLink className="nav-link active" to="/signup" end={true}>Registro</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/login" end={true}>Acceder</NavLink>
              </li>
            </ul>
            </div>
        </div>
      </nav>

      )
    }

    </div>
  )
}

export default Navbar