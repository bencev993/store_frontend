import { apiClient } from '@/api/client.js'

export const namespaced = true

export const state = {
    orders: [],
    order: []
}

export const mutations = {
    SET_ORDERS(state, orders) {
        state.orders = orders
    },

    SET_ORDER(state, order) {
        state.order = order
    },
}

export const actions = {
    fetchOrders({ commit }, page) {
        return apiClient.get('/admin/orders/?page='+page)
        .then(response => {
            console.log(response.data)
            commit('SET_ORDERS', response.data)
            return response
        })
    },

    fetchOrder({ commit }, orderId) {
        return apiClient.get('/admin/order/' + orderId)
        .then(response => {
            commit('SET_ORDER', response.data)
            return response
        })
    },

    updateOrder({ commit }, credentials) {
        return apiClient.post('/admin/update-order', credentials)
        .then(response => {
            response.status === 200 ?? this.fetchOrders
            return response
        })
    },
}

export const getters = {
    
}