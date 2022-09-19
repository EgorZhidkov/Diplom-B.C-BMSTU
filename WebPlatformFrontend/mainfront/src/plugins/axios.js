import axios from "axios";
import store from '@/store'

axios.defaults.baseURL = process.env.VUE_APP_SERVER
axios.defaults.headers.common["Content-Type"] = "application/json"

axios.interceptors.request.use((request) => {
    request.headers["Content-Type"] = "application/json"
    const accessToken = store.getters["Auth/GET_ACCESS_TOKEN"]
    request.headers.Authorization = `Bearer ${accessToken}`
    return request
})
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    const errorResponse = error.response ? error.response : error;

    if (errorResponse.status === 401) {
        console.log("Пользователь не авторизован")
    }
    return Promise.reject(error)
})

export default axios