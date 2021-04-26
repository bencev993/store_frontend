<template>
    <div class="mx-auto p-4 md:p-10">
        <h1 class="text-center py-10 font-semibold tracking-widest xl:text-xl">Your Cart</h1>
        <div class="mx-auto text-lg md:w-2/3 lg:w-full xl:text-xl">
                <div v-for="product in products" :key="product.id" class="grid grid-cols-4 mb-10 pt-5 border-t-2 lg:grid-cols-8 lg:items-center">
                    <div class="col-span-2 mx-auto product-image">
                        <img v-if="product.image" :src="imgUrl + product.image" alt="productimg" class="h-32 w-32" />
                    </div>
                    <div class="col-span-2 mx-auto w-full product-quantity flex items-center justify-evenly">
                        <h2 class="w-1/2 align-bottom text-center">{{ product.quantity }}</h2>
                        <div class="flex flex-col w-1/2 flex-auto text-center">
                            <a @click.prevent="increase(product.id)" class="px-1 mb-1 bg-orange text-white border rounded-full border-white" href="#">+</a>
                            <a @click.prevent="decrease(product.id)" class="px-1 bg-white text-orange border rounded-full border-orange" href="#">-</a>
                        </div>
                    </div>
                    <div class="col-span-2 w-full text-center py-2 product-name">
                        <h2 class="mx-auto">{{ product.name }}</h2>
                    </div>
                    <div class="col-span-2 w-4/5 text-right py-2 product-price lg:col-span-1">
                        <span>$ {{ product.price * product.quantity }}</span>
                    </div>
                    <div class="col-span-4 mt-5 text-center lg:col-span-1 lg:mt-0">
                        <a @click.prevent="removeCartItem(product.id)" class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" href="#">Remove</a>
                    </div>
                </div>

            <div class="flex justify-evenly items-end mb-4 lg:w-1/2 lg:ml-auto lg:pr-20 lg:justify-around">
                <h2 class="text-lg tracking-widest font-semibold">Total Price: </h2>
                <span class="text-red-500 font-bold text-2xl">$ {{ totalPrice }}</span>
            </div>
            <div class="flex flex-col-reverse items-center border-t-2 sm:flex-row sm:justify-evenly">
                <div class="py-10 w-4/5 sm:w-1/3 sm:px-4 md:w-1/2 lg:w-1/4">
                    <router-link to="/" class="flex justify-evenly text-center text-white text-sm cursor-pointer bg-gray-500 rounded-lg py-2 md:p-2 md:text-lg">
                        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                        Continue shopping
                    </router-link>
                </div>
                <div class="py-10 w-4/5 sm:w-1/3 sm:px-4 md:w-1/2 lg:w-1/4">
                    <router-link to="/checkout-options" class="flex justify-evenly text-center text-white text-sm cursor-pointer bg-green-500 rounded-lg p-2 md:text-lg">
                        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Proceed to checkout
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            products: null
        }
    },

    computed: {
        imgUrl() {
            return 'http://127.0.0.1:8000/images/'
        },

        totalPrice() {
            return this.$store.getters['cart/getTotalPrice']
        }
    },

    mounted() {
        this.$store.dispatch('product/fetchProducts')
        this.setCartItems()
    },

    methods: {
        setCartItems() {
            const items = JSON.parse(localStorage.getItem('cart'))
            this.$store.dispatch('cart/refreshCart', items)
            this.products = this.$store.getters['cart/getCartItems']
            if(items.length === 0) {
                this.$router.push({name: 'home'})
            }
        },

        increase(id) {
            this.$store.dispatch('cart/increaseQuantity', id)
            this.setCartItems()
        },

        decrease(id) {
            this.$store.dispatch('cart/decreaseQuantity', id)
            this.setCartItems()
        },

        removeCartItem(id) {
            if(confirm('Are you sure you want to remove this item from cart?')) {
                this.$store.dispatch('cart/removeFromCart', id)
                this.setCartItems()
            }
        }
    }
}

</script>

<style>

</style>