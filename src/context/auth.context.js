import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
   // todos los estados y funciones
   const [ isLoggedIn, setIsLoggedIn ] = useState(false);
   const [ userAdmin, setUserAdmin ] = useState(false);
   const [ user, setUser ] = useState(null);
   const [ isLoading, setIsLoading ] = useState(true);


   const authenticateUser = async () => {
       setIsLoading(true);
       try {
           const response = await verifyService();
           console.log("AuthWrapper: token valido");
           console.log("AuthWrapper: el payload es: ", response.data);
           setIsLoggedIn(true);
           setUser(response.data);
           setIsLoading(false);
        //    if (response.data.isAdmin === true) {
        //         setUserAdmin(true);
        //         console.log("Es admin")
        //     } else {
        //         setUserAdmin(false)
        //     }
        } catch (error) {
           console.log("AuthWrapper: El usuario no tiene token o el token no es valido")
           setIsLoggedIn(false);
           setUser(null);
           setIsLoading(false);
        }
   }

//    const isAdmin = async () => {
//     setIsLoading(true);
//     try {
//         const response = await verifyService();

//         if (response.data.isAdmin === true) {
//             setUserAdmin(true);
//             console.log("Es admin")
//         } else {
//             setUserAdmin(false)
//         }
        
//     } catch (error) {
//         console.log("AuthWrapper: El usuario no tiene token o el token no es valido")
//         setIsLoggedIn(false);
//         setUser(null);
//         setIsLoading(false);
//         setUserAdmin(false);
//     }
//    }


   const passedContext = {
       isLoggedIn,
       user,
       authenticateUser,
    //    isAdmin
   }

   useEffect(() => {
       authenticateUser();
   }, [])

    //? espera mientras verificamos al usuario, antes de renderizar la app
    if (isLoading === true) {
        return <div className="App"> <h3>Verificando usuario</h3> </div>
    }


    //? TODA nuestra APP
    return (
        <AuthContext.Provider value={passedContext}>
            { props.children }
        </AuthContext.Provider>

    )

}

export { AuthContext, AuthWrapper}