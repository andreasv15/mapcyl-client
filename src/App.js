import { Routes, Route } from "react-router";
import Restaurantes from './pages/Restaurantes';
import "./App.css";
import Ciudades from "./pages/Ciudades";
import Error from "./pages/NotFound";
import RestauranteDetails from "./pages/RestauranteDetails";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/Navbar";
import AddRestaurante from "./pages/AddRestaurante";
import EditarRestaurante from "./pages/EditarRestaurante";
import NotFound from "./pages/NotFound";
import IsAdmin from "./components/IsAdmin";
import Profile from "./pages/Profile";
import IsUser from "./components/IsUser";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Ciudades />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={ <IsUser> <Profile /> </IsUser> } />

        <Route path="/restaurantes/:ciudad" element={<Restaurantes />} />
        <Route path="/restaurantes/:id/details" element={<RestauranteDetails />} />
        <Route path="/restaurantes/add-restaurante" element={ <IsAdmin> <AddRestaurante /> </IsAdmin>} />
        <Route path="/restaurantes/:id/edit" element={ <IsAdmin> <EditarRestaurante /> </IsAdmin> } />


        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}
 
export default App;
