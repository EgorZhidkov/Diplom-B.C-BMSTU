import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import auth from './middlware/auth'
import middlewarePipeline from './middlware/middlewarePipeline'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const Login = () =>
    import ('@/views/Login')

const AllNotation = () =>
    import ("@/views/AllNotation")

const Container = () =>
    import ("@/components/Container/TheContainer")

const Clients = () =>
    import ('@/views/Clients')

const NotationPage = () =>
    import ('@/views/NotationPage')

const ClientPage = () =>
    import ('@/views/ClientPage')

const Dashboard = () =>
    import ('@/views/Dashboard')
const routes = [{
        path: '/',
        redirect: "/login",
        // name: 'Login',
        // component: Login
    },
    {
        path: '/container',
        name: "TheContainer",
        redirect: "/notation/all",
        component: Container,
        children: [{
                path: '/notation',
                props: true,
                meta: {
                    middleware: [
                        auth
                    ]
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'all',
                    name: 'AllNotation',
                    meta: {
                        middleware: [
                            auth
                        ]
                    },
                    component: AllNotation,
                }, {

                    path: ':id',
                    props: true,
                    name: 'NotationPage',
                    meta: {
                        middleware: [
                            auth
                        ]
                    },
                    component: NotationPage,

                }]
            },
            {
                path: '/clients',
                props: true,
                meta: {
                    middleware: [
                        auth
                    ]
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'allclients',
                    name: 'Clients',
                    meta: {
                        middleware: [
                            auth
                        ]
                    },
                    component: Clients,
                }, {

                    path: ':id',
                    props: true,
                    meta: {
                        middleware: [
                            auth
                        ]
                    },
                    name: 'ClientPage',
                    component: ClientPage,

                }]
            },
            {
                path: '/dashboard',
                props: true,
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    middleware: [
                        auth
                    ]
                },
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})
export default router