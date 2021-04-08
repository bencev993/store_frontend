<template>
    <div>
        <div class="container mx-auto my-20">
            <div class="new-products px-10" id="new">
                <h2 style="font-family: Overpass" class="uppercase tracking-widest text-xl italic text-center font-bold pb-8">
                    <!-- Category Name / Subcategory Name -->
                </h2>
                <div class="flex flex-wrap text-center gap-8 justify-center">
                    <product-card v-for="product in this.products" :key="product.id" :product="product" />
                </div>
            </div>
                <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"><span slot="no-more"></span></infinite-loading>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
    components: {
        ProductCard
    },

    props: {
        id: {}
    },

    data() {
        return {
            products: [],
            page: 1,
            infiniteId: 0
        }
    },

    methods: {
        infiniteHandler($state) {
            this.$store.dispatch('product/fetchProducts', this.page)
            .then((response) => {
                if (response.data.length) {
                    const filter = response.data.filter(product => {
                        if(product.category_id == this.id) {
                            return product
                        }       
                    })
                    this.page += 1
                    this.products.push(...filter)
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
    },

}
</script>
