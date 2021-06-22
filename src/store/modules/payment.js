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
                return response
            })
    },
}

export const getters = {
    
}