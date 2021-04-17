import { apiClient } from '@/api/client.js';

export const namespaced = true

export const state = {
    paymentStatus: null
}

export const mutations = {
    SET_PAYMENT_STATUS(state, status) {
        state.paymentStatus = status
    },
}

export const actions = {
    stripePayment({ commit }, credentials) {
        return apiClient.post('/post-payment', credentials)
            .then((response) => {
                if(response.status === 200) {
                    commit('SET_PAYMENT_STATUS', 1)
                } else {
                    commit('SET_PAYMENT_STATUS', 0)
                }
            })
    },
}

export const getters = {
    
}