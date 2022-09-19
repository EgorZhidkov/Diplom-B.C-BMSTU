// import axios from '../plugins/axios'
import axios from "axios"



export default {
    auth(object) {
        return axios.post('/auth/login', object)
    },
    regisration(object) {
        return axios.post('/auth/registration', object)
    },
    getAllRoles(object) {
        return axios.post('/auth/getAllroles', object)
    }
}