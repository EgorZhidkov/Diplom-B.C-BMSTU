export const getters = {
    GET_TITLE_PAGE(state) {
        return state.title;
    },
    GET_SIDEVAR_ACTIVE(state) {
        return state.sideBarActive;
    },
    GET_BACK_BUTTON_INFO(state) {
        return state.button_back;
    },
};
export default getters;