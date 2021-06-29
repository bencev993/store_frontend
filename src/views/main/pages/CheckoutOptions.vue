<template>
  <div class="w-4/5 mx-auto p-10 min-h-90 lg:w-full lg:px-0">
    <div class="mx-auto">
        
        <div v-if="this.$data.error_msg != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <h2 class="m-auto">{{ this.$data.error_msg }}</h2>
        </div>
            
        <div class="flex flex-col px-5 mx-auto lg:flex-row lg:justify-evenly">
            <div class="flex flex-col lg:px-10">
                <div class="w-full max-w-sm mx-auto flex flex-col lg:h-full lg:justify-around">
                    <h2 class="max-w-sm font-bold text-gray-800 text-lg">New Customers</h2>
                    <p class="max-w-sm mt-2 mb-8">Proceed to checkout and you will have an
                        opportunity to create an account at the end if one
                        does not already exist for you.</p>
                    <router-link to="/checkout" class="w-full max-w-sm shadow-lg bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-center text-white font-bold mb-20 py-2 px-4 rounded">
                        Continue as Guest
                    </router-link>
                    <div id="paypal-button-container"></div>
                </div>
            </div>
            <div class="hidden lg:block lg:border-r-2"></div>
            <div class="flex flex-col pt-20 border-t-2 lg:border-0 lg:px-10">
                <div class="max-w-sm mx-auto lg:justify-around">
                <h2 class="max-w-sm font-bold text-gray-800 text-lg">Returning Customers</h2>
                <p class="max-w-sm mx-auto mt-2 mb-8">Sign in to speed up the checkout process and save payments to account.</p>
                </div>
                <form class="w-full max-w-sm mx-auto">
                    <div class="lg:flex lg:items-center mb-6">
                        <div class="lg:w-1/3">
                            <label class="block font-bold lg:text-left mb-1 lg:mb-0 pr-4" for="email">
                                Email
                            </label>
                        </div>
                        <div class="lg:w-2/3">
                            <input required v-model="user.email" type="text" name="email"  class="bg-gray-200 shadow-sm border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-400">
                        </div>
                    </div>
                    <div class="lg:flex lg:items-center mb-6">
                        <div class="lg:w-1/3">
                            <label class="block font-bold lg:text-left mb-1 lg:mb-0 pr-4" for="password">
                                Password
                            </label>
                        </div>
                        <div class="lg:w-2/3">
                            <input required v-model="user.password" type="password" name="password" class="bg-gray-200 shadow-sm border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-400" placeholder="******************">
                        </div>
                    </div>
                    <div class="agreement text-center py-5 sm:pl-5">
                        <span class="text-sm text-gray-600">By logging in, you agree to our <a href="#" class="text-gray-700 underline">Privacy Policy</a> and <a href="#" class="text-gray-700 underline">Terms of use</a></span>
                    </div>
                    <div class="w-100 lg:pt-4">
                        <div class="w-full">
                            <button @click.prevent="login" type="submit" class="w-full shadow-lg bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Sign In
                            </button>
                        </div>
                        <div class="w-full py-5 text-center">
                            <span class="text-sm text-gray-600">Not a Member? <router-link to="/register" class="text-gray-900 underline">Join Us</router-link></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { loadScript } from '@paypal/paypal-js';
import { messageMixin } from '@/mixins/messageMixin'

export default {
    mixins: [messageMixin],
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },

    computed: {
        totalPrice() {
            return this.$store.getters['cart/getTotalPrice']
        }
    },

    async mounted() {
        var self = this
        const paypalSdk = await loadScript({
            'client-id': 'AepLKh_uoopRXVD11YYsjog4-V1nbylWVVavDDLw1rKDYnvMjyEgjyz6okDaFdMEaPVzyUj6ncg4uLq-',
            currency: 'USD',
        })
        paypalSdk.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                        value: self.totalPrice
                        }
                    }]
                })
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    setTimeout(() => {
                        self.clearData()
                    }, 5000)
                    self.showMessage('Thank you for choosing us! We have received your order. We sent you an email containing the details of your order', 5000)
                })
            }
        }).render('#paypal-button-container')
    },

    methods: {
        login() {
            this.$store.dispatch('user/login', this.user)
            .then( () => {
                this.$router.push({ name: 'checkout' })
            })
        },

        clearData() {
            this.$router.push({ name: 'home' })
            this.$store.dispatch('cart/emptyCart')
            this.$store.dispatch('user/logout')
        }
    }
}
</script>

<style>

</style>