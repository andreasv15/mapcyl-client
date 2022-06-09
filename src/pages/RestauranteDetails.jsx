import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IsAdmin from '../components/IsAdmin';
import { AuthContext } from '../context/auth.context';
import { pendienteService, visitadoService } from '../services/profile.services';
import { deleteRestauranteService, editRestauranteService, getRestauranteDetailsService } from '../services/restaurante.services';

function RestauranteDetails() {
    const { id } = useParams();
    const { isLoggedIn, user, authenticateUser, userAdmin } = useContext(AuthContext);
    const [ votacion, setVotacion ] = useState(0);
    const [ nombre, setNombreRestaurante ] = useState("");
    const [ direccion, setDireccionRestaurante ] = useState("");
    const [ ciudad, setCiudadRestaurante ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);

    const [ restauranteDetails, setRestauranteDetails ] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        try {
            //const response = await axios.get(`http://localhost:5005/api/restaurantes/${id}/details`);
            //console.log(response)
            const response = await getRestauranteDetailsService(id)
            
            // console.log("details ", response.data.puntuacion);
            // console.log("restaurante detail: ", response.data)
            setVotacion(response.data.puntuacion)
            setNombreRestaurante(response.data.nombre)
            setDireccionRestaurante(response.data.direccion)
            setCiudadRestaurante(response.data.ciudad.nombre)
            setRestauranteDetails(response.data);

        } catch (error) {
            navigate("/error")
        }
    }


    if (restauranteDetails === null) {
        return <h3> ... Loading </h3>
    }

    const handleClickVisitado = async () => {
        try {
            const response = await getRestauranteDetailsService(id)
            // console.log("handlevisitado: ", response.data);
        
            await visitadoService(response.data);

        } catch (error) {
          if (error.response.status === 400 || error.response.status === 401 ) {
            setErrorMessage(error.response.data.errorMessage);
          } else {
            navigate("/error")
          }
        }
        
    }

    const handleClickPendiente = async () => {
        try {
            const response = await getRestauranteDetailsService(id)
            // console.log("handlependiente: ", response.data);
        
            await pendienteService(response.data);

        } catch (error) {
            if (error.response.status === 400 || error.response.status === 401 ) {
                setErrorMessage(error.response.data.errorMessage);
              } else {
                navigate("/error")
              }
            }
    }
    
    const handleClickVotar = async () => {
        try {
            setVotacion( votacion + 1 )
            //console.log("despues de setVotacion: ", response.data)
    
            const votarRestaurante = {
                nombre,
                direccion,
                ciudad,
                puntuacion: votacion+1
            }
            
            await editRestauranteService(id, votarRestaurante);
            navigate(`/restaurantes/${id}/details`)
    
        } catch (error) {
            navigate("/error")
        }

    }

    const handleDelete = async () => {
        try {
      
            await deleteRestauranteService(id);
            navigate("/");
      
          } catch (error) {
            navigate("/error");
          }
    }


  return (
    <div >
    <h1 style={{'marginTop': '15px', 'marginBottom': '25px'}}> {restauranteDetails.nombre}  </h1>
    { restauranteDetails === null && <h3> ... Loading </h3>}

    {
        <div key={restauranteDetails._id}>
            <img src={restauranteDetails.imagen} alt="imagen" width="1000px" />

            <br />
            <br />
            <h4> Dirección: {restauranteDetails.direccion} </h4>

            <p> Puntuación: {votacion} </p>
        </div>        
    }
    {userAdmin === true && (
        <div>
            <Link to={`/restaurantes/${id}/edit`}><button className='btn btn-warning'> Editar </button></Link>
            <button onClick={handleDelete} className='btn btn-danger'> Borrar </button>
        </div>


    )}

    {
        (isLoggedIn === true && userAdmin === false) && (
            <div>
                <button onClick={handleClickVisitado} className='px-2 mx-4 btn btn-success'> ¡Ya he ido! </button>
                <button onClick={handleClickPendiente} className='px-2 mx-4 btn btn-warning'> ¡Tengo que probarlo! </button>
                <button onClick={handleClickVotar} className='px-2 mx-4 btn btn-info'> ¡Votar! </button>
            </div>
        )
    }


    { errorMessage !== null && <h4> {errorMessage} </h4>}

    </div>
  )
}

export default RestauranteDetails