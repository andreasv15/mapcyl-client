import service from "./config.services";

const profileService = () => {
    return service.get(`/profile`);
}

const visitadoService = (restaurante) => {
    // return service.patch(`/profile/${restaurante}`)
    return service.post("/profile/add-visitado", restaurante);

}

const pendienteService = (restaurante) => {
    return service.post("/profile/add-pendiente", restaurante);

    // return service.patch(`/profile/${restaurante}`)
}

const deleteVisitadoService = (data) => {
    return service.patch("/profile/remove-visitado", {data });
}

const deletePendienteService = (resPendiente) => {
    return service.patch("/profile/remove-pendiente", resPendiente);
}

export {
    profileService,
    visitadoService,
    pendienteService,
    deleteVisitadoService,
    deletePendienteService
}