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

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Ciudades />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ciudades" element={<Ciudades />} />
        <Route path="/restaurantes/:ciudad" element={<Restaurantes />} />
        <Route path="/restaurantes/:id/details" element={<RestauranteDetails />} />
        <Route path="/restaurantes/add-restaurante" element={ <IsAdmin> <AddRestaurante /> </IsAdmin>} />
        <Route path="/restaurantes/:id/edit" element={<EditarRestaurante />} />


        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}
 
export default App;
