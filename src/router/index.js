import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/pages/Home.vue'
import Dashboard from '../views/admin/pages/Dashboard'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/product/:id",
        name: "product",
        component: () => import("../views/main/pages/ShowProduct.vue"),
        props: true,
    },
    {
        path: "/category/:id",
        name: "category",
        component: () => import("../views/main/pages/Category.vue"),
        props: true,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/main/pages/Login.vue"),
        meta: { hideForAuth: true }
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/main/pages/Register.vue"),
        meta: { hideForAuth: true }
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/main/pages/Profile.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("../views/main/pages/Cart.vue"),
    },
    {
        path: "/checkout-options",
        name: "checkout-options",
        component: () => import("../views/main/pages/CheckoutOptions.vue"),
    },
    {
        path: "/checkout",
        name: "checkout",
        component: () => import("../views/main/pages/Checkout.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        beforeEnter(to, from, next) {
            if (getUser()) {
                if (getUser().scope != 'admin') {
                    next('/')
                } else {
                    next()
                }
            } else {
                next('/')
            }
        },
        component: Dashboard,
        meta: { requiresAuth: true, layout: 'admin' },
    },
    {
        path: "/account",
        name: "dashboard-account",
        component: () => import("../views/admin/pages/Account"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: "/product",
        name: "dashboard-product",
        component: () => import("../views/admin/pages/ProductList"),
        meta: { requiresAuth: true, layout: 'admin' },
    },
    {
        path: "/edit-product/:id",
        name: "dashboard-product-edit",
        component: () => import("../views/admin/pages/EditProduct"),
        meta: { requiresAuth: true, layout: 'admin' },
        props: true,
    },
    {
        path: "/category",
        name: "dashboard-category",
        component: () => import("../views/admin/pages/Category"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: "/order",
        name: "dashboard-order",
        component: () => import("../views/admin/pages/Order"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: "/stock",
        name: "dashboard-stock",
        component: () => import("../views/admin/pages/Stock"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: "/statistic",
        name: "dashboard-statistic",
        component: () => import("../views/admin/pages/Statistic"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: "/help",
        name: "dashboard-help",
        component: () => import("../views/admin/pages/Help"),
        meta: { requiresAuth: true, layout: 'admin' }
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("../views/main/layouts/NotFound"),
        meta: { requiresAuth: true, layout: '404' },
    }
    
]

const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to, from, next) => {
    const user = getUser()

    if(to.matched.some(record => record.meta.requiresAuth) && !user) {
        next('/')
    }
    next()

    if (to.matched.some(record => record.meta.hideForAuth) && user) {
        next({ path: '/profile' })
    }
    next()
})

function getUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user || null
}

export default router
