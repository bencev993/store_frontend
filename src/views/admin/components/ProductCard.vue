<template>
    <router-link v-if="product.id" :to="{ name: 'dashboard-product-edit', params:{ id: product.id } }">
        <div class="grid grid-cols-2 mb-10 md:mb-0 sm:px-6 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-8 py-1 pr-6 items-center border-b dotted">
            <span class="mx-auto row-span-3 md:col-span-2 md:row-auto xl:col-span-1 xl:row-span-1"><img class="h-24 w-24" :src="this.productImage(product)"/></span>
            <span class="md:col-span-2 xl:col-span-1">{{ product.name }}</span>
            <p class="hidden break-words overflow-y-auto max-h-10 py-2 text-xs text-center md:max-h-24 md:col-span-2 md:text-xs lg:block">{{ product.description }}</p>
            <span class="py-2">$ {{ product.price }}</span>
            <span>stock: {{ product.stock }}</span>
            <div class="my-4 md:my-0 md:mx-auto md:col-span-2 xl:col-span-1">
                <form method="patch" v-if="product.is_active == 1">
                    <input type="hidden" name="is_active" value="0">
                    <input type="hidden" name="id" :value="product.id">
                    <div class='form-group'>
                        <input value="Deactivate" type="submit" class="py-1 md:w-full cursor-pointer shadow bg-orange hover:bg-red-900 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-2 rounded">
                    </div>
                </form>
                <form method="patch" v-else>
                    <input type="hidden" name="is_active" value="1">
                    <input type="hidden" name="id" :value="product.id">
                    <div class='form-group'>
                        <input value="Activate" type="submit" class="py-1 md:w-full cursor-pointer shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
                </form>

            </div>


            <div class="my-4 md:my-0 md:mx-auto md:col-span-2 xl:col-span-1">
                <form method="post">
                    <div class='form-group' onclick="return confirm('Are you sure you want to remove this product?')">
                        <input type="submit" value="Remove" class="py-1 md:w-full cursor-pointer shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
                </form>
            </div>
        </div>
    </router-link>
</template>

<script>
import { productMixin } from '@/mixins/productMixin'
    export default {
        mixins: [productMixin],

        props: {
            product: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>