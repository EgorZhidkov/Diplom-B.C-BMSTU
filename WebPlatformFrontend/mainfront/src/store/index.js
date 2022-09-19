import Vue from 'vue'
import Vuex from 'vuex'
import { NavSideBar } from "./modules/NavSideBar/index";
import { Auth } from './modules/Auth';
import { Notation } from './modules/Notation';
import { Clients } from './modules/Clients';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        NavSideBar,
        Auth,
        Notation,
        Clients
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            paths: ["NavSideBar", "Auth", 'Notation', 'Clients'],
        }),
    ],
    strict: true
})