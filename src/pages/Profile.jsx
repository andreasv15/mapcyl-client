import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context"
import { deleteVisitadoService, profileService } from '../services/profile.services';


function Profile() {
  const [ user, setUser ] = useState(null)
  const [ resVisitados, setResVisitados ] = useState([])
  const [ resPendiente, setResPendientes ] = useState([])
  // const { isLoggedIn, user} = useContext(AuthContext);
  const navigate = useNavigate();
  

  // // console.log(user)
  useEffect(() => {
    getUserDetails();
  }, [])

  // console.log(user)

  const getUserDetails = async () => {
    try {
      const response = await profileService()
      // console.log("desde front, visitados: ", response.data.visitado)
      // console.log("desde front, pendientes: ", response.data.pendiente)

      setUser(response.data)
      setResVisitados(response.data.visitado)
      setResPendientes(response.data.pendiente)
      
    } catch (error) {
      navigate("/error")
    }

  }



  return (

    <div>    
    { user === null && <h3> ... Loading </h3>}

      { user !== null && (
        <h1> Bienvenido, {user.nombre} </h1>      
        
      )}

      <h3> Tus restaurantes visitados </h3>
      { resVisitados !== null && (
        resVisitados.map((eachRes) => {
          return (
            <div>
            <h5> {eachRes.nombre} </h5>
              <img src={eachRes.imagen} alt='img' width="300px" />
              <br />
              <br />
              <Link to={`/restaurantes/${eachRes._id}/details`}> <button className='btn btn-primary'> ¡Ver más! </button> </Link>
              <hr />

            </div>
          )            
          })
      )}


        <h3> Tus restaurantes pendientes </h3>
        { resPendiente !==null && (
          resPendiente.map((eachRes) => {
          return (
            <div>
              <h5>  {eachRes.nombre} </h5>
              <img src={eachRes.imagen} alt='img' width="300px" /> 
              <br />
              <br />
              <Link to={`/restaurantes/${eachRes._id}/details`}> <button className='btn btn-primary'> ¡Ver más! </button> </Link>
              <hr />

            </div>
          )
          })
      )
      }


    </div>
  )
}

export default Profile