<template>
    <div class="grid grid-cols sm:grid-cols-2 sm:px-6 lg:px-0 relative">
        <div v-if="this.$data.error_msg != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>
        <div class="flex flex-col mx-auto w-3/4 mt-10 bg-gradient-to-r from-blue-600 via-blue-600 to-teal-500 py-4 px-8 rounded-lg shadow-lg shadow-outer sm:w-full xl:w-3/4">
            <div class="w-full px-3 mb-8">
                <label class="block text-white text-sm font-semibold" for="name">Title</label>
                <input v-model="product.name" name="name" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="text" required placeholder="Blue T-shirt">
            </div>
            <div class="w-full flex flex-col place-items-center px-3 mb-8 justify-evenly sm:flex-row">
                <div class="w-1/2 sm:w-1/4">
                    <label class="block text-white text-sm font-semibold" for="price">
                        Price
                    </label>
                    <input v-model="product.price" name="price" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" placeholder="30.4" step="0.01">
                </div>
                <div class="w-1/2 sm:w-1/4">
                    <label class="block text-white text-sm font-semibold" for="discount">
                        Discount
                    </label>
                    <input v-model="product.discount" name="discount" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" placeholder="0 %">
                </div>
                <div class="w-1/2 sm:w-1/4">
                    <label class="block text-white text-sm font-semibold" for="stock">
                        Stock
                    </label>
                    <input v-model="product.stock" name="stock" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" placeholder="15">
                </div>
            </div>
            <div class="w-full px-3 mb-8">
                <label class="block text-white text-sm font-semibold" for="category">
                    Category
                </label>
                <select v-model="product.category" name="category" class="appearance-none border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none">
                    <option disabled value="0">Select Category</option>
                    <template v-for="category in this.categories">
                        <option v-for="subcategory in category.subcategories" :key="subcategory.id" :value="subcategory.id" class="text-black">
                        {{ category.parent_name }} --- {{ subcategory.category_name }}
                        </option>
                    </template>
                </select>
            </div>
            <div class="w-full px-3">
                <label class="block text-white text-sm font-semibold" for="description">
                    Description
                </label>
                <textarea v-model="product.description" name="description" class="border-2 border-gray-800 rounded-lg block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" rows="10" cols="30"></textarea>
            </div>

        </div>

        <div class="flex flex-col w-full mx-auto mt-4 lg:mt-0 justify-evenly">
            <div class="flex flex-col">
                <template v-if="this.img_urls">
                    <img v-for="url in this.img_urls" :key="url" :src="url" class="w-1/2 xl:w-1/3 mx-auto mb-10 lg:mb-0" width="200px" />
                    <input class="w-2/3 mx-auto" v-show="!disabled" type="file" multiple accept="image/jpeg" @change="uploadFile" />
                </template>
                <template v-else>
                    <input class="w-2/3 mx-auto" v-show="!disabled" type="file" multiple accept="image/jpeg" @change="uploadFile" />
                    <!-- <button 
                        @click="$refs.file.click()"
                        class="w-2/3 py-1 mx-auto cursor-pointer shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                        Upload Image
                    </button> -->
                </template>
            </div>

            <div class="w-full px-3 my-8">
                <input @click.prevent="createProduct" type="submit" value="Create" class="w-2/3 py-1 cursor-pointer shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
            </div>

        </div>
    </div>
</template>

<script>
import { messageMixin } from '@/mixins/messageMixin'
    export default {
        mixins: [messageMixin],

        data() {
            return {
                product: {
                    name: '',
                    price: '',
                    discount: '',
                    stock: '',
                    category: '',
                    description: '',
                    images: []
                },
                categories: {},
                img_urls: [],
            }
        },

        computed: {
            disabled() {
                return this.product.images.length === 3
            }
        },

        mounted() {
            this.$store.dispatch('category/fetchCategories')
            .then((response) => {
                this.categories = response.data.categories
            })
        },

        methods: {
            uploadFile(event) {
                let file = event.target.files[0]
                this.img_urls.push(URL.createObjectURL(file))
                this.product.images.push(file)
            },

            validateForm() {
                if(!this.product.name || this.product.name.length < 5) {
                    this.showMessage('Product name must be at least 5 characters long')
                    this.error = true
                    return false
                }
                if(!this.product.price) {
                    this.showMessage('Price can not be empty')
                    this.error = true
                    return false
                }
                if(!this.product.stock) {
                    this.showMessage('Stock can not be empty')
                    this.error = true
                    return false
                }
                if(!this.product.description || this.product.description.length < 10) {
                    this.showMessage('Description must be at least 10 characters long')
                    this.error = true
                    return false
                }
                if(this.product.images.length != 3) {
                    this.showMessage('Product must have 3 images')
                    this.error = true
                    return false
                }

                this.product.discount == '' ? this.product.discount = 0 : this.product.discount
                !this.product.category ? this.product.category = null : this.product.category
                return true
            },

            createProduct() {
                if(!this.validateForm()) {
                    return false
                }
                 
                let data = new FormData()
                let i = 0
                this.product.images.forEach(image => {
                    data.append(`images[${i}]`, image)
                    i++
                })
                data.append('images', this.product.images)
                data.append('name', this.product.name)
                data.append('price', this.product.price)
                data.append('discount', this.product.discount)
                data.append('stock', this.product.stock)
                data.append('category', this.product.category)
                data.append('description', this.product.description)

                this.$store.dispatch('product/createProduct', data)
                .then((response) => {
                    if(!response.status === 200) {
                        this.error = true
                        this.showMessage('Something went wrong')
                        return false
                    }
                    this.showMessage('Product created successfully')
                    this.product.name = ''
                    this.product.price = ''
                    this.product.discount = ''
                    this.product.stock = ''
                    this.product.category = ''
                    this.product.description = ''
                    this.product.images = []
                    this.img_urls = []
                })

                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>