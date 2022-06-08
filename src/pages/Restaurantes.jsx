import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllRestaurantesService } from '../services/restaurante.services';

function Restaurantes() {
    const { ciudad } = useParams();
    const navigate = useNavigate();
    const [ todosRestaurantes, setTodosRestaurantes ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        getRestaurantes();
    }, [])

    const getRestaurantes = async () => {
        try {
            //const response = await axios.get(`http://localhost:5005/api/restaurantes/${ciudad}`);
            // console.log(response.data)
            
            const response = await getAllRestaurantesService(ciudad);
            //console.log(response.data);
            setTodosRestaurantes(response.data)

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
        <h1 style={{'margin-top': '15px', 'margin-bottom': '25px'}}> Restaurantes de {ciudad} </h1>
        { todosRestaurantes === null && <h3> ... Loading </h3>}
        
        <div className="d-flex flex-wrap gap-1">        
        {
          todosRestaurantes !== null && todosRestaurantes.map((cadaRestaurante) => {
          return (
            <div className="p-3 card" style={{width: 500 + 'px'}} key={cadaRestaurante._id}>

            <h3> {cadaRestaurante.nombre} </h3> 
            
              <img src={cadaRestaurante.imagen} alt="img" width="300px" className="d-block w-100" />

              <br />
                <Link to={`/restaurantes/${cadaRestaurante._id}/details`}> <button className='btn btn-primary'> ¡Ver más! </button> </Link>
            </div>
          )
        })
      }
      { errorMessage !== null && <p> {errorMessage} </p> }

        </div>

    </div>
  )
}

export default Restaurantes