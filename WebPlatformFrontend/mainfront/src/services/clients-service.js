import axios from "axios";

export default {
    getAllClients(object) {
        return axios.post('/clients/getAllClients', object)
    },
    getClientInfo(object) {
        return axios.post('/clients/getClientInfo', object)
    },
    updateClientInfo(object) {
        return axios.post('/clients/updateClientInfo', object)
    }
}