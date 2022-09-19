export default function auth({ next, store }) {
    if (!store.getters["Auth/GET_AUTH_STATUS"] === true) {
        store._mutations['Auth/SET_CLEAR'][0]()
        return next({
            name: 'Login'
        })
    }
    return next()
}