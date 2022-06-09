import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editRestauranteService, getRestauranteDetailsService } from '../services/restaurante.services';

function EditarRestaurante() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const [ nombre, setNombreRestaurante ] = useState("");
  const [ direccion, setDireccionRestaurante ] = useState("");
  const [ ciudad, setCiudadRestaurante ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);


  useEffect(() => {
    getRestDetails();
  }, [])

  const getRestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/restaurantes/${id}/details`);
      //const response = await getRestauranteDetailsService(id);
      //console.log(response)
      const { nombre, direccion, puntuacion } = response.data;
      const ciudadRestaurante = response.data.ciudad.nombre
      // const { nombreRestaurante, direccionRestaurante, ciudadRestaurante } = response.data;
      //console.log(ciudadRestaurante)

      setNombreRestaurante(nombre)
      setDireccionRestaurante(direccion)
      setCiudadRestaurante(ciudadRestaurante)

    } catch (error) {
      navigate("/error")
    }
  }

  const handleNombreChange = (e) => setNombreRestaurante(e.target.value);
  const handleDireccionChange = (e) => setDireccionRestaurante(e.target.value);
  const handleCiudadChange = (e) => setCiudadRestaurante(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(nombreRestaurante, direccionRestaurante,ciudadRestaurante);

    try {
      const editarRestaurante = {
        nombre,
        direccion,
        ciudad
      }
      // console.log(editarRestaurante.nombre,editarRestaurante.direccion);

      //await axios.patch(`http://localhost:5005/api/restaurantes/${id}`, editarRestaurante);
      //console.log(response)
      
      await editRestauranteService(id, editarRestaurante);
      navigate(`/restaurantes/${id}/details`)

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
        <h1> Editar restaurante </h1>

        <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column align-items-center'>

            <input type='text' className="form-control w-50 p-3" name='nombreRestaurante' placeholder='Escribe el nombre del restaurante' onChange={handleNombreChange} value={nombre} />
            <br />
            <input type='text' className="form-control w-50 p-3" name='direccionRestaurante' placeholder='Escribe la direccion del restaurante' onChange={handleDireccionChange} value={direccion} />
            <br />

            <select className="form-select w-50 p-3" name="ciudadRestaurante" onChange={handleCiudadChange} value={ciudad}>
                <option value="Avila">Avila</option>
                <option value="Burgos">Burgos</option>
                <option value="Leon">Leon</option>
                <option value="Palencia" selected> Palencia</option>
                <option value="Salamanca">Salamanca</option>
                <option value="Segovia">Segovia</option>
                <option value="Soria">Soria</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Zamora">Zamora</option>
            </select>

            <br />
        </div>
            { errorMessage !== null && <p> {errorMessage} </p> }

            <button type='submit' className='btn btn-success'> Guardar </button>
        </form>
    
    </div>
  )
}

export default EditarRestaurante