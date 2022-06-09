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
          <div className='d-flex flex-column align-items-center'>
              <input type='text' name='nombreUsuario' className="form-control w-50 p-3" placeholder='Escribe tu nombre' style={{ textAlign: "center"}} value={nombre} onChange={handleChangeNombre} />
              <br />
              <input type='text' name='usernameUsuario' className="form-control w-50 p-3" placeholder='Escribe el nombre de usuario' style={{ textAlign: "center"}} value={username} onChange={handleChangeUsername} />
              <br />
              <input type='email' name='emailUsuario' className="form-control w-50 p-3" placeholder='Escribe tu correo electrónico' style={{ textAlign: "center"}} value={email} onChange={handleChangeEmail} />
              <br />
              <input type='password' name='password' className="form-control w-50 p-3" placeholder='Escribe una contraseña' style={{ textAlign: "center"}} value={password} onChange={handleChangePassword} />
          </div>

              <br />

              { errorMessage !== null && <p> {errorMessage} </p> }

              <button className='btn btn-info'> Registrarse </button>
          </form>
    </div>
  )
}

export default Signup