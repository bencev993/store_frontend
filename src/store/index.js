import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user.js';
import * as product from '@/store/modules/product.js';
import * as category from '@/store/modules/category.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    product,
    category
  },
  state: {},
  mutations: {},
  actions: {}
});
