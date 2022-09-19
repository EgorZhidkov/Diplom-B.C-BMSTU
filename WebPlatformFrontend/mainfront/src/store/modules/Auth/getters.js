export const getters = {
    GET_USER_PROFILE(state) {
        return state
    },
    GET_AUTH_STATUS(state) {
        return state.auth_status
    },
    GET_ACCESS_TOKEN(state) {
        return state.token
    },
    getUserAbbr: (state) => { return state.abbreviation },
    getUserId: (state) => { return state.id },
    getUserName: (state) => { return state.name },
    getUserRoleAccess: (state) => (payload) => {
        let statusAccess = false
        state.roles.forEach(role => {
            payload.forEach(item => {
                if (item === role.value) {
                    console.log(true)
                    statusAccess = true
                }
            })
        });
        return statusAccess
    }
};
export default getters;