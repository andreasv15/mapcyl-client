import service from "./config.services.js";


const getAllRestaurantesService = (ciudad) => {
    return service.get(`/restaurantes/${ciudad}`)
}

const addRestauranteService = (restaurante) => {
    return service.post("/restaurantes/add-restaurante", restaurante);
}

const getRestauranteDetailsService = (id) => {
    return service.get(`/restaurantes/${id}/details`)
}

const deleteRestauranteService = (id) => {
    return service.delete(`/restaurantes/${id}`)
}

const editRestauranteService = (id, restaurante) => {
    return service.patch(`/restaurantes/${id}`, restaurante)
}

export {
    getAllRestaurantesService,
    addRestauranteService,
    getRestauranteDetailsService,
    deleteRestauranteService,
    editRestauranteService
}
