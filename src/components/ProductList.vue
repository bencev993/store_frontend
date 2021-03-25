<template>
    <div v-show="!isLoading">
        <div class="container mx-auto my-20">
            <div class="featured-products pb-20 px-10" id="featured">
                <h2 style="font-family: Overpass" class="uppercase tracking-widest text-xl italic text-center font-bold pb-8">
                    Featured Products
                </h2>

                <div class="flex flex-wrap text-center gap-8 justify-center">
                    <product-card v-for="product in productsForSale" :key="product.id" :product="product" />
                </div>
            </div>
        </div>    

        <div class="container mx-auto my-20">
            <div class="new-products px-10" id="new">
                <h2 style="font-family: Overpass" class="uppercase tracking-widest text-xl italic text-center font-bold pb-8">
                    New Products
                </h2>
                <div class="flex flex-wrap text-center gap-8 justify-center">
                    <product-card v-for="product in products" :key="product.id" :product="product" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import NProgress from 'nprogress'

export default {
    name: "ProductList",

    components: {
        ProductCard
    },

    data() {
        return {
            loading: true
        }
    },

    computed: {
        products() {
            return this.$store.state.product.products.filter(product => {
                if(product.discount == 0) {
                    return product
                } 
            })
        },

        productsForSale() {
            return this.$store.state.product.products.filter(product => {
                if(product.discount > 0) {
                    return product
                } 
            })
        },

        isLoading() {
            return this.loading
        }

    },

    mounted() {
        NProgress.start()
        this.$store.dispatch('product/fetchProducts').then(() => {
            NProgress.done()
            this.loading = false
        })
    },

}
</script>
