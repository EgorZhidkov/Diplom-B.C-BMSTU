import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

export const Clients = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};