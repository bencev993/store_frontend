<template>
    <div>
        <div v-show="this.page === 2" class="container mx-auto my-20">
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
                    <product-card v-for="product in this.products" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
                <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"><span slot="no-more"></span></infinite-loading>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
    components: {
        ProductCard
    },

    data() {
        return {
            products: [],
            page: 1,
            infiniteId: 0
        }
    },

    computed: {
        productsForSale() {
            return this.$store.state.product.products.filter(product => {
                if(product.discount > 0) {
                    return product
                } 
            })
        },
    },

    methods: {
        infiniteHandler($state) {
            this.$store.dispatch('product/fetchProducts', this.page)
            .then((response) => {
                if (response.data.length) {
                    this.page += 1
                    this.products.push(...response.data)
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
    },

}
</script>
