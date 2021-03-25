import { apiClient } from '@/api/client.js';

export const namespaced = true

export const state = {
    categories: []
}

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },

    ADD_CATEGORY(state, category) {
        state.categories.push(category)
    }
}

export const actions = {
    fetchCategories({ commit }) {
        return apiClient.get('/categories')
        .then(response => {
            commit('SET_CATEGORIES', response.data.categories)
            return response
        })
    },

    createCategory({ commit }, category) {
        return apiClient.post('/admin/create-category', category)
        .then(response => {
            if(response.status === 200) {
                commit('ADD_CATEGORY', response.data.category)
            }
            return response
        })
    },

    deleteCategory({ commit }, category) {
        return apiClient.post('/admin/delete-category', {
            id: category
        })
        .then(response => {
            if(response.status === 200) {
                commit('SET_CATEGORIES', response.data.categories)
            }
            return response
        })
    }
}

export const getters = {
    getCategories(state) {
        return state.categories
    },
}