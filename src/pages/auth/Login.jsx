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
      
      navigate("/profile")



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
          <form onSubmit={handleLogin} className="mb-3">
          <div className='d-flex flex-column align-items-center'>
              <input type='text' name='username' className="form-control w-50 p-3" placeholder='Escribe tu nombre de usuario o correo' style={{ textAlign: "center"}} value={identificador} onChange={handleIdentifChange} />
              <br />
              <input type='password' name='password' className="form-control w-50 p-3" placeholder='Escribe tu contraseña' style={{ textAlign: "center"}} value={password} onChange={handlePasswordChange} />
          </div>
          <br />

                { errorMessage !== null && <p> {errorMessage} </p> }

                <button type='submit' className='btn btn-success'> Acceder </button>
            </form>
    </div>
  )
}

export default Login