import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./main.css"
import InfiniteLoading from 'vue-infinite-loading';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhoneAlt, faClipboardList, faUserNinja, faDumbbell, faDollarSign, faCheck, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF, faInstagram, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { apiClient } from "./api/client"

library.add([ faPhoneAlt, faClipboardList, faUserNinja, faDumbbell, faDollarSign,
    faCheck, faFacebookF, faTwitter, faInstagram, faGooglePlusG, faArrowUp ])

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(InfiniteLoading, { /* options */ })
Vue.config.productionTip = false

new Vue({
  router,
  store,

  created() {
      const userToken = localStorage.getItem('user')
      const cartItems = JSON.parse(localStorage.getItem('cart'))
      
      if(userToken) {
          const userData = JSON.parse(userToken)
          this.$store.commit('user/SET_USER_DATA', userData)
      }
      
      if(cartItems) {
        this.$store.dispatch('cart/refreshCart', cartItems)
      }

      apiClient.interceptors.response.use(
          response => response,
          error => {
            if(error.response.status === 401) {
              this.$store.dispatch('user/logout')
            }
            return Promise.reject(error)
          }
      )
  },

  render: h => h(App)
}).$mount("#app")
