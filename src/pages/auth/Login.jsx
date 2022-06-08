import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginService, verifyService } from "..//../services/auth.services";
 
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser, isAdmin } = useContext(AuthContext)

  const navigate = useNavigate();

  const [ identificador, setIdentificador ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleIdentifChange = (e) => {
    setIdentificador(e.target.value);

  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      identificador,
      password
    }


    try {
      // validamos usuario y contraseña
      const response = await loginService(user);
      
      // si el login es correcto, guardamos el token en localStorage, en response.data se encuentra el token
      localStorage.setItem("authToken", response.data.authToken);
      authenticateUser();
      
      navigate("/ciudades")



    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401 ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error")
      }
    }
  }


  return (
    <div>
        <h1> Login </h1>

        <form onSubmit={handleLogin}>
            <input type='text' name='username' placeholder='Escribe tu nombre de usuario o correo' value={identificador} onChange={handleIdentifChange} />
            <br />
            <input type='password' name='password' placeholder='Escribe tu contraseña' value={password} onChange={handlePasswordChange} />
            <br />

            { errorMessage !== null && <p> {errorMessage} </p> }

            <button type='submit'> Acceder </button>
        </form>

    </div>
  )
}

export default Login