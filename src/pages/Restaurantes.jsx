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
    <div style={{'paddingTop': '15px', 'paddingBottom': '25px'}}>
        <h1 style={{'marginTop': '15px', 'marginBottom': '25px'}}> Restaurantes de {ciudad} </h1>
        { todosRestaurantes === null && errorMessage === null && <h3> ... Loading </h3>}
        
        <div className="d-flex flex-wrap gap-4 justify-content-around">        
        {
          todosRestaurantes !== null && todosRestaurantes.map((cadaRestaurante) => {
            return (
              <div className="p-3 card" style={{width: 500 + 'px', backgroundColor: "#FFE6BC"}} key={cadaRestaurante._id}>

              <h3 className="card-title"> {cadaRestaurante.nombre} </h3> 
              
                <img src={cadaRestaurante.imagen} alt="img" width="300px" className="card-img-top" />
                <br />
                  <Link to={`/restaurantes/${cadaRestaurante._id}/details`}> <button className='btn btn-primary'> ¡Ver más! </button> </Link>
              </div>
            )
          })
        }
        
          { errorMessage !== null && <h4> {errorMessage} </h4>}
        
      </div>

    </div>
  )
}

export default Restaurantes