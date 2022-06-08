import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { addRestauranteService } from '../services/restaurante.services';

function AddRestaurante() {
  const [ nombreRestaurante, setNombreRestaurante ] = useState("");
  const [ direccionRestaurante, setDireccionRestaurante ] = useState("");
  const [ ciudadRestaurante, setCiudadRestaurante ] = useState("Avila");
  
  // const { isAdmin } = useContext(AuthContext)

  const navigate = useNavigate();


  const handleNombreChange = (e) => {
    //console.log(e.target.value);
    setNombreRestaurante(e.target.value);
  }

  const handleDireccionChange = (e) => {
    //console.log(e.target.value);
    setDireccionRestaurante(e.target.value)
  }

  const handleCiudadChange = (e) => {
    //console.log(e.target.value);
    setCiudadRestaurante(e.target.value)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(nombreRestaurante, direccionRestaurante,ciudadRestaurante);
    try {
      const nuevoRestaurante = {
        nombre: nombreRestaurante,
        direccion: direccionRestaurante,
        ciudad: ciudadRestaurante,
        puntuacion: 0
      }
      //console.log(nuevoRestaurante.nombre,nuevoRestaurante.direccion, nuevoRestaurante.ciudad, nuevoRestaurante.puntuacion);

      //const response = await axios.post("http://localhost:5005/api/restaurantes/add-restaurante", nuevoRestaurante);
      
      //console.log(nuevoRestaurante)
      await addRestauranteService(nuevoRestaurante);
      //console.log(response);
      //console.log("hecho")
      navigate("/ciudades")

    } catch (error) {
      navigate("/error")
    }

  }


  return (
    
    <div>
        <h1> Añadir restaurante </h1>

        <form onSubmit={handleSubmit}>
            <input type='text' name='nombreRestaurante' placeholder='Escribe el nombre del restaurante' onChange={handleNombreChange} value={nombreRestaurante} />
            <br />
            <input type='text' name='direccionRestaurante' placeholder='Escribe la direccion del restaurante' onChange={handleDireccionChange} value={direccionRestaurante} />
            <br />

            <select name="ciudadRestaurante" onChange={handleCiudadChange} value={ciudadRestaurante}>
                <option value="Avila">Avila</option>
                <option value="Burgos">Burgos</option>
                <option value="Leon">Leon</option>
                <option value="Palencia">Palencia</option>
                <option value="Salamanca">Salamanca</option>
                <option value="Segovia">Segovia</option>
                <option value="Soria">Soria</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Zamora">Zamora</option>
            </select>

            <br />

            <button type='submit'> Añadir </button>
        </form>
    
    </div>
  )
}

export default AddRestaurante