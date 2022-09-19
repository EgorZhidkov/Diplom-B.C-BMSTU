import authService from "../../../services/auth-service"
import jwtDecode from "jwt-decode";
const Auth = async({ commit, getters }, payload) => {
    payload = JSON.stringify(payload);

    return await new Promise((resolve, reject) => {
        authService.auth(payload).then((responce) => {
                console.log(responce)
                commit("SET_TOKEN", responce.data.token)
                let decode_data_jwt = jwtDecode(responce.data.token)
                console.log(decode_data_jwt)
                commit("SET_ROLES", decode_data_jwt.roles)
                commit("SET_NAME", decode_data_jwt.fullName)
                commit("SET_ID", decode_data_jwt.id)
                commit("SET_AUTH_STATUS", true)
                commit("SET_ABBREVIATION", decode_data_jwt.fullName)
                commit("SET_EMAIL", decode_data_jwt.email)
                commit("SET_PHONE", decode_data_jwt.phone)
                resolve(true)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data.message)
                reject(error.response.data.message)
            })
    })
}

export const actions = {
    Auth
}