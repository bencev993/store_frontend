<template>

<div>
    <div id="panels" class="flex flex-col h-screen">
        <div class="bg-white min-h-10">
            <nav class="tabs flex flex-col sm:flex-row px-10">
                <button @click="togglePanel" :class="!tabClicked ? 'text-blue-500 border-b-2 border-blue-500' : ''" class="tab text-sm tracking-widest text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none">
                    All products
                </button>
                <button @click="togglePanel" :class="tabClicked ? 'text-blue-500 border-b-2 border-blue-500' : ''" class="tab text-sm tracking-widest text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none">
                    New product
                </button>
            </nav>
        </div>

        <div class="panel-1 tab-content" v-show="!tabClicked">
            <div class="mx-auto text-center text-xs sm:text-sm w-full lg:w-4/5">
                <div class="flex flex-row justify-end mb-10 md:mb-0">
                    <!-- <?php $link = ['route' => 'admin.product.index'] ?>
                    @include('admin.includes.searchform', $link) -->
                </div>
                    <product-card v-for="product in this.products" v-on:reset="reset" :key="product.id" :product="product" />
            </div>
            <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"><span slot="no-more"></span></infinite-loading>
        </div>
        <div class="panel-2 tab-content lg:h-full" v-show="tabClicked">
            <div class="flex">
                <div class="mx-auto text-center text-xs sm:text-sm w-full lg:w-4/5">
                    <create-product></create-product>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import ProductCard from '../components/ProductCard'
import CreateProduct from '../components/CreateProduct'

    export default {
        components: {
            ProductCard,
            CreateProduct
        },

        data() {
            return {
                tabClicked: false,
                products: [],
                page: 1,
                infiniteId: 0
            }
        },

        methods: {
            togglePanel() {
                this.tabClicked = !this.tabClicked
            },

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

            reset() {
                this.page = 1
                this.products = []
                this.infiniteId += 1
            },

        },
    }
</script>

<style lang="scss" scoped>

</style>