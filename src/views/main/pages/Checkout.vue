<template>
<div class="container mx-auto p-10">
    <div class="w-3/4 lg:w-2/4 mx-auto">
        <h1 class="text-xl text-center mb-4 border-b-2 pb-2 lg:pb-8">Checkout</h1>
        <h4 class="mb-4">Your Total Payment: ${{ totalPrice }}</h4>
        <div v-if="this.$data.error_msg != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>

        <form method="post" id="payment-form">
            <div class="flex flex-col md:flex-row -mx-3">
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                        <i class="text-red-500">* </i>Full Name
                    </label>
                    <input v-model="user.name" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" name="name" type="text" placeholder="Full name" required>
                </div>
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                        <i class="text-red-500">* </i>Email
                    </label>
                    <input v-model="user.email" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" name="email" type="email" placeholder="johndoe@gmail.com" required>
                </div>
            </div>

            <div class="flex flex-col md:flex-row -mx-3">
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                        <i class="text-red-500">* </i>Phone
                    </label>
                    <input v-model="user.phone" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" name="phone" type="number" placeholder="1234567891" required>
                </div>
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
                        <i class="text-red-500">* </i>Address
                    </label>
                    <input v-model="user.address" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" name="address" type="text" placeholder="Street, house number" required>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row -mx-3">
                <div class="w-full lg:w-2/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="city">
                        <i class="text-red-500">* </i>City
                    </label>
                    <input v-model="user.city" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" name="city" type="text" placeholder="Chicago" required>
                </div>
                <div class="w-full lg:w-2/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="country">
                        <i class="text-red-500">* </i>Country
                    </label>
                    <input v-model="user.country" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="country" name="country" type="text" placeholder="United States" required>
                </div>
                <div class="w-full lg:w-1/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="zipcode">
                        <i class="text-red-500">* </i>Zip code
                    </label>
                    <input v-model="user.zip" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zipcode" name="zipcode" type="number" placeholder="12345" required>
                </div>
            </div>

            <div class="form-row mb-8">
                <label for="card-element">
                <i class="text-red-500">* </i>Credit or debit card
                </label>
                <div id="card-element" class="mt-2">
                <!-- A Stripe Element will be inserted here. -->
                </div>

                <!-- Used to display Element errors. -->
                <div id="card-errors" role="alert"></div>
            </div>
            <div class="flex">
                <div id="paypal-button"></div>
                <button id="place-order" class="mx-auto shadow-md bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Place Order</button>
            </div>
        </form>

    </div>
</div>

</template>

<script>

import { messageMixin } from '@/mixins/messageMixin'

export default {
    mixins: [messageMixin],

    data() {
        return {
            stripeAPIToken: 'pk_test_51HHWrwKg112ZJOxiCv5J7DUSybBa8HihazaqXyPqhdXwduVJHTw9PHMIJIVH5GHKPIp6YSca0AdQvWy2d3tAy9wt00jGkbIpjx',
            stripe: '',
            elements: '',
            card: '',
            user: {
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                country: '',
                zip: '',
            },
            cartItems: null
        }
    },

    mounted() {
        this.includeStripe('js.stripe.com/v3/', function(){
            this.configureStripe()
        }.bind(this))

        let user = this.$store.getters['user/loggedIn']
        if(user) {
            user = this.$store.getters['user/getUser']
            this.user.name = user.name
            this.user.email = user.email
            this.user.phone = user.phone
            this.user.address = user.address
            this.user.city = user.city
            this.user.country = user.country
            this.user.zip = user.zip
        } 
    },

    computed: {
        totalPrice() {
            return this.$store.getters['cart/getTotalPrice']
        }
    },

    methods: {
        submitPayment() {
            if(!this.validateForm) {
                return false
            }

            this.cartItems = this.$store.getters['cart/getCartItems']
            this.$store.dispatch('payment/stripePayment', {
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
                address: this.user.address,
                city: this.user.city,
                country: this.user.country,
                zip: this.user.zip,
                total: this.totalPrice,
                items: cartItems
            })
        },

        validateForm() {
            if(!this.user.name) {
                this.showMessage('Name field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.email) {
                this.showMessage('Email field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.phone) {
                this.showMessage('Phone field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.address) {
                this.showMessage('Address field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.city) {
                this.showMessage('City field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.country) {
                this.showMessage('Country field can not be empty')
                this.error = true
                return false
            }
            if(!this.user.zip) {
                this.showMessage('Zip field can not be empty')
                this.error = true
                return false
            }
            if(!this.cartItems) {
                this.showMessage('Items disappeared from your cart')
                this.error = true
                return false
            }
            return true
        },

        includeStripe( URL, callback ){
            let documentTag = document, tag = 'script',
            object = documentTag.createElement(tag),
            scriptTag = documentTag.getElementsByTagName(tag)[0]
            object.src = '//' + URL
            if (callback) { object.addEventListener('load', function (e) { callback(null, e) }, false) }
            scriptTag.parentNode.insertBefore(object, scriptTag)
        },

        configureStripe(){
            let cardStyle = {
                base: {
                    iconColor: '#666ee8',
                    color: '#31325f',
                    fontWeight: 400,
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '15px',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    ':-webkit-autofill': {
                        color: '#666ee8',
                    },
                },
            }

            this.stripe = Stripe(this.stripeAPIToken);
            this.elements = this.stripe.elements();
            this.card = this.elements.create('card', {style: cardStyle});
            this.card.mount('#card-element');
        },
    },

    beforeDestroy() {
        card.destroy(this.$refs.card)
    }

}
</script>

<style>

</style>