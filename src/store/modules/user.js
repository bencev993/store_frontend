import { apiClient } from '@/api/client.js';

export const namespaced = true

export const state = {
    user: null,
}

export const mutations = {
    SET_USER_DATA(state, tokenData) {
        state.user = tokenData
        localStorage.setItem('user', JSON.stringify(tokenData))
        apiClient.defaults.headers.common['Authorization'] = tokenData.token ? `Bearer ${tokenData.token}` : '';
    },

    CLEAR_USER_DATA() {
        localStorage.removeItem('user')
        location.reload()
    }
}

export const actions = {
    register({ commit }, credentials) {
        return apiClient.post('/register', credentials).then(
            ({ data }) => {
                commit('SET_USER_DATA', data)
            }
        )
    },

    login({ commit }, credentials) {
        return apiClient.post('/login', credentials).then(
            ({ data }) => {
                commit('SET_USER_DATA', data)
            }
        )
    },

    logout({ commit }) {
        commit('CLEAR_USER_DATA')
    },

    getUserData({ commit }, token) {
        return apiClient.post('/')
    },

    updateUser({ commit }, user) {
        return apiClient.post('/admin/update-user', user)
        .then(response => {
            return response
        })
    }
}

export const getters = {
    loggedIn(state) {
        return !!state.user
    },

    getUser(state) {
        return state.user
    },

    isAdmin(state) {
        return state.user.scope === 'admin'
    }
}