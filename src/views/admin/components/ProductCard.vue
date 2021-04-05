<template>
    <router-link v-if="product.id" :to="{ name: 'dashboard-product-edit', params:{ id: product.id } }">
        <div v-if="this.$data.error_msg != '' " :class="this.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex z-10 absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>
        <div class="grid grid-cols-2 mb-10 md:mb-0 sm:px-6 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-8 py-1 pr-6 items-center border-b dotted">
            <span class="mx-auto row-span-3 md:col-span-2 md:row-auto xl:col-span-1 xl:row-span-1"><img class="h-24 w-24" :src="this.productImage(product)"/></span>
            <span class="break-words overflow-y-auto md:col-span-2 xl:col-span-1">{{ product.name }}</span>
            <p class="hidden break-words overflow-y-auto max-h-10 py-2 text-xs text-center md:max-h-24 md:col-span-2 md:text-xs lg:block">{{ product.description }}</p>
            <span class="py-2">$ {{ product.price }}</span>
            <span>stock: {{ product.stock }}</span>
            <div class="my-4 md:my-0 md:mx-auto md:col-span-2 xl:col-span-1">
                <template v-if="product.is_active == 1">
                    <input type="hidden" name="id" :value="product.id">
                    <div class='form-group'>
                        <input @click.prevent="activateProduct(product.id)" value="Deactivate" type="submit" class="py-1 md:w-full cursor-pointer shadow bg-orange hover:bg-red-900 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-2 rounded">
                    </div>
                </template>
                <template v-else>
                    <input type="hidden" name="id" :value="product.id">
                    <div class='form-group'>
                        <input @click.prevent="activateProduct(product.id)" value="Activate" type="submit" class="py-1 md:w-full cursor-pointer shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
                </template>

            </div>


            <div class="my-4 md:my-0 md:mx-auto md:col-span-2 xl:col-span-1">
                    <div class='form-group'>
                        <input @click.prevent="deleteProduct(product.id)" type="submit" value="Remove" class="py-1 md:w-full cursor-pointer shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import { messageMixin } from '@/mixins/messageMixin'
import { productMixin } from '@/mixins/productMixin'

    export default {
        mixins: [productMixin, messageMixin],

        props: {
            product: {
                required: true,
                type: Object
            }
        },

        data() {
            return {
                error: false
            }
        },

        methods: {
            activateProduct(id) {
                this.$store.dispatch('product/activateProduct', id)
                .then(response => {
                    if(response.status == 200) {
                        this.$emit('reset')
                    }
                })
            },

            deleteProduct(id) {
                if(confirm('Are you sure you want to delete this product?')) {
                    this.$store.dispatch('product/deleteProduct', id)
                    .then((response) => {
                        if(response.status === 200) {
                            this.showMessage('Product successfully deleted')
                            setTimeout(() => {
                                this.$emit('reset')
                            }, 3000)
                        }
                    })
                }
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>