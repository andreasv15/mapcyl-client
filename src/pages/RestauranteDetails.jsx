import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRestauranteDetailsService } from '../services/restaurante.services';

function RestauranteDetails() {
    const { id } = useParams();

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
            //console.log("details ", response.data);
            setRestauranteDetails(response.data);

        } catch (error) {
            navigate("/error")
        }
    }


    if (restauranteDetails === null) {
        return <h3> ... Loading </h3>
    }

  return (
    <div>
    <h1> {restauranteDetails.nombre}  </h1>
    { restauranteDetails === null && <h3> ... Loading </h3>}

    {
        <div key={restauranteDetails._id}>
            <img src={restauranteDetails.imagen} alt="imagen" width="1000px" />

            <h4> Dirección: {restauranteDetails.direccion} </h4>



            <p> Puntuación: {restauranteDetails.puntuacion} </p>
        </div>        
    }

    <Link to={`/restaurantes/${id}/edit`}><button className='btn btn-warning'> Editar </button></Link>

    </div>
  )
}

export default RestauranteDetails