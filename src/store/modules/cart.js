
export const namespaced = true

export const state = {
    items: [],
    checkoutStatus: null
}

export const mutations = {
    SET_CART_ITEMS(state, items) {
        state.items = items
    },

    SET_CHECKOUT_STATUS(state, status) {
        state.checkoutStatus = status
    },

    ADD_PRODUCT_TO_CART(state, product) {
        let image = product.images.length > 0 ? product.images[0].image : ''
        state.items.push({
            id: product.id,
            name: product.name,
            image: image,
            price: product.price,
            quantity: 1
        })
    },

    REMOVE_PRODUCT_FROM_CART(state, id) {
        let index = state.items.findIndex(item => item.id == id)
        const items = localStorage.getItem('cart')

        if(index) {
            state.items.splice(index, 1)
        }
        if(items) {
            const cartItems = JSON.parse(items)
            let index = cartItems.findIndex(item => item.id == id)
            cartItems.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }
    },

    INCREASE_BY_ONE(state, id) {
        const cartItem = state.items.find(item => item.id == id)
        const items = localStorage.getItem('cart')

        if(cartItem) {
            cartItem.quantity++
        }
        if(items) {
            const cartItems = JSON.parse(items)
            let index = cartItems.findIndex(item => item.id == id)
            cartItems[index].quantity ++
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }
    },

    DECREASE_BY_ONE(state, id) {
        const cartItem = state.items.find(item => item.id == id)
        const items = localStorage.getItem('cart')
        if(cartItem) {
            cartItem.quantity--
        }
        if(items) {
            const cartItems = JSON.parse(items)
            let index = cartItems.findIndex(item => item.id == id)
            cartItems[index].quantity --
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }   
    }
    
}

export const actions = {
    addToCart({ state, commit }, product) {
        commit('SET_CHECKOUT_STATUS', null)
        const cartItem = state.items.find(item => item.id == product.id)
        if(!cartItem) {
            commit('ADD_PRODUCT_TO_CART', product)
        } else {
            commit('INCREASE_BY_ONE', product.id)
        }
    },

    removeFromCart({ commit }, id) {
        commit('REMOVE_PRODUCT_FROM_CART', id)
    },

    refreshCart({ commit }, items) {
        commit('SET_CART_ITEMS', items)
    },

    increaseQuantity({ commit }, id) {
        commit('INCREASE_BY_ONE', id)
    },

    decreaseQuantity({ commit }, id) {
        const cartItem = state.items.find(item => item.id == id)
        if(cartItem.quantity == 1) {
            commit('REMOVE_PRODUCT_FROM_CART', id)
        } else {
            commit('DECREASE_BY_ONE', id)
        }
    },

    emptyCart({ commit }) {
        commit('SET_CART_ITEMS', [])
        localStorage.clear()
    }
}

export const getters = {
    getCartItems(state) {
        return state.items
    },

    getCountedItems(state, getters) {
        return getters.getCartItems.reduce((count, product) => {
            return count + product.quantity
        }, 0)
    },

    getTotalPrice(state, getters) {
        return getters.getCartItems.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }

}