import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const handleChangeNombre = (e) => setNombre(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      nombre,
      username,
      email,
      password
    }

    try {
      await signupService(user);
      navigate("/login")
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }

    }


  }

  return (
    <div>
        <h1> Registro de usuario </h1>

        <form onSubmit={handleSignup}>
        
            <input type='text' name='nombreUsuario' placeholder='Escribe tu nombre' value={nombre} onChange={handleChangeNombre} />
            <br />
            <input type='text' name='usernameUsuario' placeholder='Escribe el nombre de usuario' value={username} onChange={handleChangeUsername} />
            <br />
            <input type='email' name='emailUsuario' placeholder='Escribe tu correo electrónico' value={email} onChange={handleChangeEmail} />
            <br />
            <input type='password' name='password' placeholder='Escribe una contraseña' value={password} onChange={handleChangePassword} />
            <br />

            { errorMessage !== null && <p> {errorMessage} </p> }

            <button> Registrarse </button>
        </form>
    </div>
  )
}

export default Signup