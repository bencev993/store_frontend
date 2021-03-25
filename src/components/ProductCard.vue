<template>
    <div :class="{'product-for-sale': forSale}" class="product relative my-10 h-64 mx-auto">
        <span v-if="forSale" class="off absolute transform rotate-45 text-white text-md text-semibold">{{ product.discount }}%<i class="text-xs"> OFF</i></span>
        <div class="toggle-btn h-full">
        <router-link v-if="product.id" :key="product.id" :to="{ name: 'product', params:{ id: product.id } }">
            <img v-if="product.images" class="h-56 mx-auto product-img" :src="this.productImage(product)" alt="productimg" />
            <template v-if="forSale">
            <h2 class="mt-4 text-sm tracking-wider">{{ product.name }}</h2>
            <div class="flex flex-row">
                <h2 class="pt-2 w-1/3 line-through text-sm text-right">{{ product.price }} </h2>
                <h2 class="pt-2 w-1/3 text-center text-xl font-semibold text-red-600">${{ calculatedPrice }}</h2>
                <h2 class="w-1/3"></h2>
            </div>
            </template>
            <template v-else>
                <h2 class="mt-4 text-sm tracking-wider">{{ product.name }}</h2>
                <h2 class="pt-2 text-lg">${{ product.price }}</h2>
            </template>
        </router-link>
        </div>

        <div class="add-to-cart w-full hidden">
            <button v-if="this.inStock" class="add-to-cart-btn text-white font-semibold rounded-lg flex mx-auto">
                <svg class="w-8 p-2 bg-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <!-- <a href="{{ route('product.addtocart', ['id' => $product['id']]) }}" class="mx-auto flex items-center h-full"><span class="block font-bold text-xs">ADD TO CART</span></a> -->
                <a href="#"><span class="py-2 px-1 font-bold text-xs">ADD TO CART</span></a>
            </button>
            <button v-else class="add-to-cart-btn font-semibold rounded-lg flex mx-auto cursor-default">
                <span class="py-2 px-1 font-bold text-xs bg-gray-300 text-black">Out of stock</span>
            </button>
        </div>
        
    </div>
</template>

<script>
import { productMixin } from '@/mixins/productMixin';

export default {
    mixins: [productMixin],

    props: {
        product: {
            type: Object,
            required: true
        }
    },

    computed: {
        calculatedPrice() {
            return this.product.price - this.product.discount * this.product.price / 100;
        },
        forSale() {
            return this.product.discount > 0;
        },
    }

};
</script>
