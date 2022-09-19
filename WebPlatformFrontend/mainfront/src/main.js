import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import '@/plugins/axios'
import { iconsSet as icons } from './assets/icons/icons.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "./assets/fonts/fonts.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import InputMask from 'vue-input-mask';

Vue.component('input-mask', InputMask)


// Vue.config.performance = true

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

console.log('process.env.VUE_APP_USE_AD_AUTH:', process.env.VUE_APP_AUTH)
console.log('process.env.VUE_APP_USE_AD_AUTH:', process.env.VUE_APP_SERVER)

new Vue({
    router,
    store,
    icons,
    template: '<App/>',
    render: h => h(App)
}).$mount('#app')