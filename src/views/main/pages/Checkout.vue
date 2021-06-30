<template>
<div class="container mx-auto">
    <div class="w-3/4 lg:w-2/4 mx-auto">
        <h1 class="text-xl text-center mb-4 border-b-2 pb-2 pt-10">Checkout</h1>
        <h4 class="mb-4">Your Total Payment: ${{ totalPrice }}</h4>
        <div v-if="this.$data.error_msg != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>

        <form>
            <div class="flex flex-col md:flex-row -mx-3">
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                        <i class="text-red-500">* </i>Full Name
                    </label>
                    <input v-model="user.name" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" name="name" type="text" placeholder="Full name" required>
                </div>
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                        <i class="text-red-500">* </i>Email
                    </label>
                    <input v-model="user.email" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" name="email" type="email" placeholder="johndoe@gmail.com" required>
                </div>
            </div>

            <div class="flex flex-col md:flex-row -mx-3">
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                        <i class="text-red-500">* </i>Phone
                    </label>
                    <input v-model="user.phone" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" name="phone" type="number" placeholder="1234567891" required>
                </div>
                <div class="w-full px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
                        <i class="text-red-500">* </i>Address
                    </label>
                    <input v-model="user.address" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" name="address" type="text" placeholder="185 Berry St" required>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row -mx-3">
                <div class="w-full lg:w-2/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="city">
                        <i class="text-red-500">* </i>City
                    </label>
                    <input v-model="user.city" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" name="city" type="text" placeholder="San Francisco" required>
                </div>
                <div class="w-full lg:w-2/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="state">
                        <i class="text-red-500">* </i>State
                    </label>
                    <input v-model="user.state" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state" name="state" type="text" placeholder="United States" required>
                </div>
                <div class="w-full lg:w-1/3 px-3 mb-8">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="zipcode">
                        <i class="text-red-500">* </i>Zip code
                    </label>
                    <input v-model="user.zip" class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zipcode" name="zipcode" type="number" placeholder="12345" required>
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
                <button @click.prevent="prevPage" class="mx-auto bg-gray-300 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Back</button>
                <button @click.prevent="submitPayment" id="place-order" class="mx-auto shadow-md bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Place Order</button>
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
            stripeError: '',
            elements: '',
            token: '',
            card: '',
            user: {
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip: '',
            },
            cartItems: null
        }
    },

    mounted() {
        this.includeStripe('ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
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
            this.user.state = user.state
            this.user.zip = user.zip
        } 
    },

    computed: {
        totalPrice() {
            return this.$store.getters['cart/getTotalPrice']
        }
    },

    methods: {
        validateForm() {
            if(!this.user.name || this.user.name.length < 5) {
                this.showMessage('Name field must have at least 5 characters')
                this.$data.error = true
                return false
            }
            if(this.user.name.length > 40) {
                this.showMessage('Name field can not be longer than 40 characters')
                this.$data.error = true
                return false
            }
            if(!this.user.email) {
                this.showMessage('Email field can not be empty')
                this.$data.error = true
                return false
            }
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
                this.showMessage('Please enter a valid email address')
                this.$data.error = true
                return false
            }
            if(!this.user.phone || this.user.phone.length < 10 || this.user.phone.length > 15) {
                this.showMessage('Phone number must be between 10 and 15 characters')
                this.$data.error = true
                return false
            }
            if(!this.user.address) {
                this.showMessage('Address field can not be empty')
                this.$data.error = true
                return false
            }
            if(!this.user.city) {
                this.showMessage('City field can not be empty')
                this.$data.error = true
                return false
            }
            if(!this.user.state) {
                this.showMessage('state field can not be empty')
                this.$data.error = true
                return false
            }
            if(!this.user.zip) {
                this.showMessage('Zip field can not be empty')
                this.$data.error = true
                return false
            }
            if(!this.cartItems) {
                this.showMessage('Items disappeared from your cart')
                this.$data.error = true
                return false
            }
            if(!this.token) {
                console.log(this.token)
                this.showMessage('Something went wrong with your card')
                this.$data.error = true
                return false
            }
            return true
        },

        includeStripe( URL, callback ){
            let documentTag = document, tag = 'script',
            object = documentTag.createElement(tag),
            scriptTag = documentTag.getElementsByTagName(tag)[0]
            object.src = '//' + URL
            object.setAttribute('defer', 'defer')
            if (callback) { object.addEventListener('load', function (e) { callback(null, e) }, false) }
            scriptTag.parentNode.insertBefore(object, scriptTag)
        },

        configureStripe(){
            let cardStyle = {
                base: {
                    iconColor: '#666ee8',
                    color: '#31325f',
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

            this.stripe = Stripe(this.stripeAPIToken)
            this.elements = this.stripe.elements()
            this.card = this.elements.create('card', {style: cardStyle})
            this.card.mount('#card-element')
        },

        async createToken() {
            var self = this
            await this.stripe.createToken(this.card).then(function(result) {
                if (!result.error) {
                    self.token = result.token.id
                    return true
                    
                } else {
                    this.stripeError = result.error.message
                    return false
                }
            })
            this.token = self.token
            console.log(this.token)
            return
        },

        async submitPayment() {
            this.cartItems = this.$store.getters['cart/getCartItems']
            
            await this.createToken()

            if(!this.validateForm()) {
                return false
            }
            
            this.$store.dispatch('payment/stripePayment', {
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
                address: this.user.address,
                city: this.user.city,
                state: this.user.state,
                zip: this.user.zip,
                total: this.totalPrice,
                items: this.cartItems,
                stripeToken: this.token
            })
            .then(response => {
                if(!response.status === 200) {
                    this.$data.error = true
                    this.showMessage('Something went wrong')
                    return false
                }
                
                setTimeout(() => {
                    this.clearData()
                }, 3000)

                this.showMessage('Your order created successfully! Thank you for choosing us!')
                
            })
        },

        clearData() {
            this.$router.push({ name: 'home' })
            this.$store.dispatch('cart/emptyCart')
            this.$store.dispatch('user/logout')
        },
        
        prevPage() {
            this.$router.go(-1)
        }
    },

    beforeDestroy() {
        card.destroy(this.$refs.card)
    }

}
</script>

<style>

</style>