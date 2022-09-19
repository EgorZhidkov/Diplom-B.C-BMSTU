import axios from "axios";

export default {
    allNotation(object) {
        return axios.post('/content/getAllRecord', object)
    },
    createNotation(object) {
        return axios.post('/content/createNewRecord', object)
    },
    getAllCategories() {
        return axios.post('/content/getAllCategories')
    },
    getOneNotation(object) {
        return axios.post('/content/getOneNotation', object)
    },
    updateNotation(object) {
        return axios.post('/content/updateNotation', object)
    },
    deleteNotation(object) {
        return axios.post('/content/deleteNotation', object)
    }
}