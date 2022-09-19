export const mutations = {
    SET_TITLE_PAGE(state, payload) {
        state.title = payload;
    },
    SET_SIDEVAR_ACTIVE(state, payload) {
        state.sideBarActive = payload;
    },
    SET_BUTTON_BACK_STATUS(state, payload) {
        state.button_back.status = payload;
    },
    SET_BUTTON_BACK_TITLE(state, payload) {
        state.button_back.title = payload;
    },
};
export default mutations;