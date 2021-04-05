import { apiClient } from '@/api/client.js'

export const namespaced = true

export const state = {
    products: [],
    product: []
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },

    SET_PRODUCT(state, product) {
        state.product = product
    }
}

export const actions = {
    fetchProducts({ commit }, page) {
        return apiClient.get('/products/?page='+page)
        .then(response => {
            commit('SET_PRODUCTS', response.data)
            return response
        })
    },

    fetchProduct({ commit }, productId) {
        return apiClient.get('/product/' + productId)
        .then(response => {
            commit('SET_PRODUCT', response.data)
            return response
        })
    },

    createProduct({ commit }, product) {
        return apiClient.post('/admin/create-product', product)
        .then(response => {
            response.status === 200 ?? this.fetchProducts
            return response
        })
    },

    updateProduct({ commit }, product) {
        return apiClient.post('/admin/update-product', product)
        .then(response => {
            response.status === 200 ?? this.fetchProducts
            return response
        })
    },

    activateProduct({ commit }, id) {
        return apiClient.post('/admin/activate-product', {
            id: id
        })
        .then(response => {
            response.status === 200 ?? this.fetchProducts
            return response
        })
    },

    deleteProduct({ commit }, id) {
        return apiClient.post('/admin/delete-product', {
            id: id
        })
        .then(response => {
            response.status === 200 ?? this.fetchProducts
            return response
        })
    }

}

export const getters = {
    getProducts(state) {
        return state.products
    },

    getProduct(state) {
        return state.product
    },

    getPopularProducts(state) {
        return state.products.sort((a, b) => b.sold - a.sold).slice(0, 5)
    }
}