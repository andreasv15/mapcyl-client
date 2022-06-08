import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Restaurantes() {
    const navigate = useNavigate();
    const [ todasCiudades, setTodasCiudades ] = useState(null);

    useEffect(() => {
        getCiudades();
    }, [])

    const getCiudades = async () => {
        try {
            const response = await axios.get("http://localhost:5005/api/ciudades");
            setTodasCiudades(response.data)

        } catch (error) {
            navigate("/error")
        }
    }

    // if (todasCiudades === null) {
    //     return <h3> ... Loading </h3>
    // } 


  return (
    <div >
        <h1 style={{'margin-top': '15px', 'margin-bottom': '25px'}}> Listado de todas las ciudades </h1>

        { todasCiudades === null && <h3> ... Loading </h3>}
        <div className="d-flex flex-wrap gap-1 ">
        {
            todasCiudades !== null && todasCiudades.map((cadaCiudad) => {
          return (
            <div className="p-3 card" style={{width: 500 + 'px'}} key={cadaCiudad._id}>
                <h3 className="card-title"> {cadaCiudad.nombre} </h3> 
                <img className="card-img-top" src={cadaCiudad.imagen} alt="imagen" width="300px" />
                <br />
                <p className="card-subtitle mb-2 text-muted"> {cadaCiudad.habitantes} habitantes </p>
                <Link to={`/restaurantes/${cadaCiudad.nombre}/`} style={{ textDecoration: 'none', color: 'black' }}> <button className="btn btn-info"> <img width="50px" src="https://cdn-icons-png.flaticon.com/512/1996/1996055.png" alt="img" /> </button> </Link>
            </div>
          )
        })
      }

        </div>
    </div>
  )
}

export default Restaurantes