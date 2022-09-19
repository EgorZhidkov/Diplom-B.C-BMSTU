export const mutations = {
    SET_NAME(state, payload) {
        state.name = payload
    },
    SET_EMAIL(state, payload) {
        state.email = payload
    },
    SET_ROLES(state, payload) {
        state.roles = payload
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    },
    SET_ID(state, payload) {
        state.id = payload;
    },
    SET_AUTH_STATUS(state, payload) {
        state.auth_status = payload;
    },
    SET_ABBREVIATION(state, payload) {
        let abbr = payload.split(" ")
        if (abbr.length > 1) {
            abbr = abbr[0][0] + abbr[1][0]
        } else {
            abbr = abbr[0][0] + abbr[0][abbr.length - 1]
        }
        state.abbreviation = abbr
    },
    SET_PHONE(state, payload) {
        state.phone = payload;
    },
    SET_EMAIL(state, payload) {
        state.email = payload;
    },
    SET_CLEAR(state) {
        state.name = null,
            state.email = null,
            state.roles = [],
            state.token = null,
            state.id = null,
            state.auth_status = false,
            state.abbreviation = ""
    }
}
export default mutations;