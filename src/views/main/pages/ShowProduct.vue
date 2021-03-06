<template>
    <div v-show="!isLoading" class="container product-container mx-auto mt-16 lg:mt-32 sm:px-12 sm:text-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 text-center">
            <div class="p-2 half-width flex flex-col">
                <div class="w-3/4 mx-auto border-4 rounded-lg flex flex-col flex-1">
                    <img v-if="this.product.images && !this.imgClicked" class="w-48 h-48 m-auto" :src="this.productImage(this.product)" alt="productimg" />
                    <img v-else class="w-48 h-48 m-auto" :src="this.src" alt="productimg" />
                </div>
                <div v-if="this.product.images" class="flex flex-1 items-center justify-around lg:justify-between w-3/4 mx-auto mt-12">
                    <div v-for="image in this.product.images" :key="image.id">
                        <img @click="replaceImage" class="product-images w-24 h-24 border-4 rounded-lg p-1 cursor-pointer hover:border-orange active:border-orange" :src="imgUrl + image.image" alt="productimg" />
                    </div>
                </div>
            </div>
            <div class="py-2 px-10 flex flex-col justify-between font-semibold">
                <h2 class="mt-10 lg:mt-0 uppercase">{{ this.product.name }}</h2>
                <h2 class="mt-10 text-left font-semibold text-gray-800">Description</h2>
                <div v-if="isLong">
                    <p class="mt-4 font-thin text-left text-gray-700">{{ this.product.description.substr(0, 400) + '....'}}</p>
                    <a href='#full-desc' class='py-2 text-left text-gray-800 font-semibold underline text-sm hover:text-gray-400'>READ MORE</a>
                </div>
                <div v-else>
                    <p class="mt-4 font-thin text-left text-gray-700">{{ this.product.description }}</p>
                </div>
                <h2 class="mt-10">${{ this.product.price }}</h2>
                <button v-if="this.inStock" class="add-to-cart-btn mt-10 text-white rounded-lg flex mx-auto w-1/2 h-10">
                    <svg class="h-full w-1/6 md:w-2/6 lg:w-1/6 p-2 bg-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <a @click.prevent="addToCart()" href="#" class="mx-auto flex items-center h-full"><span class="block font-bold text-xs">ADD TO CART</span></a>
                </button>
                <button v-else class="mt-10 text-white text-center rounded-lg flex mx-auto w-1/2 h-10 cursor-default items-center">
                    <span class="w-full py-2 px-1 font-bold text-xs bg-gray-300 text-black">Out of stock</span>
                </button>
            </div>
        </div>
        <div v-if="isLong" class="mt-32 px-10 lg:p-2 flex flex-col justify-center">
            <h2 class="text-gray-800 font-semibold uppercase" id="full-desc">Product Details</h2>
            <p class="mt-10 text-gray-700">{{ this.product.description }}</p>
        </div>
    </div>
</template>

<script>
import { productMixin } from '@/mixins/productMixin'
import { messageMixin } from '@/mixins/messageMixin'
import NProgress from 'nprogress'

export default {
    mixins: [productMixin, messageMixin],

    props: {
        id: {
            required: true
        },
    },

    data() {
        return {
            loading: true,
            imgClicked: false,
            src: '',
            product: {},
            cartItems: []
        }
    },

    computed: {
        isLong() {
            return this.product.description && this.product.description.length > 400
        },
        isLoading() {
            return this.loading
        }
    },

    mounted() {
        this.getProduct()
    },

    methods: {
        getProduct() {
            NProgress.start()
            this.$store.dispatch('product/fetchProduct', this.id)
            .then((response) => {
                this.product = response.data.product
                NProgress.done()
                this.loading = false
            })
        },

        addToCart() {
            this.$store.dispatch('cart/addToCart', this.product)
            .then(() => {
                if(localStorage.getItem('cart')) {
                    this.cartItems = JSON.parse(localStorage.getItem('cart'))
                    if(!this.checkStorage(this.product.id)) {
                        let image = this.product.images.length > 0 ? this.product.images[0].image : ''
                        this.cartItems.push({
                            id: this.product.id,
                            name: this.product.name,
                            image: image,
                            price: this.product.price,
                            quantity: 1
                        })
                        localStorage.setItem('cart', JSON.stringify(this.cartItems))
                    }

                } else {
                    let image = this.product.images.length > 0 ? this.product.images[0].image : ''
                    this.cartItems.push({
                        id: this.product.id,
                        name: this.product.name,
                        image: image,
                        price: this.product.price,
                        quantity: 1
                    })
                    localStorage.setItem('cart', JSON.stringify(this.cartItems))
                }

                this.showMessage(`${this.product.name} added to your cart`)
            })
        },

        checkStorage(id) {
            const items = localStorage.getItem('cart')
            let exists = false
            
            if (items) {
                const cartItems = JSON.parse(items)
                if(cartItems.find(item => item.id === id)) {
                    exists = true
                }
            }

            return exists
        },

        replaceImage(e) {
            this.src = e.target.src
            this.imgClicked = true
        }

    }

}
</script>
