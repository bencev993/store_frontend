import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as product from '@/store/modules/product.js'
import * as order from '@/store/modules/order.js'
import * as category from '@/store/modules/category.js'
import * as cart from '@/store/modules/cart.js'
import * as payment from '@/store/modules/payment.js'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    product,
    order,
    category,
    cart,
    payment
  },
  state: {},
  mutations: {},
  actions: {}
})
