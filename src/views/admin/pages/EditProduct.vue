<template>
    <div class="m-auto text-center text-xs sm:text-sm lg:w-4/5">
        <div class="container">
            <div class="grid grid-cols sm:grid-cols-2 sm:px-6 lg:px-0 relative">
                <div v-if="this.$data.msg_heading != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex flex-col absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
                    <span class="m-auto">{{ this.$data.msg_heading }}</span>
                </div>
                <div class="flex flex-col mx-auto w-auto lg:w-full xl:w-3/4 bg-gradient-to-r from-blue-600 via-blue-600 to-teal-500 py-4 px-8 rounded-lg shadow-lg shadow-outer">
                    <div class="w-full px-3 mb-8">
                        <label class="block text-white text-sm font-semibold" for="name">Title</label>
                        <input v-model="newProduct.name" name="name" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="text" required :placeholder="this.product.name">
                    </div>
                    <div class="w-full flex flex-col place-items-center px-3 mb-8 justify-evenly sm:flex-row">
                        <div class="w-1/2 sm:w-1/4">
                            <label class="block text-white text-sm font-semibold" for="price">
                                Price
                            </label>
                            <input v-model="newProduct.price" name="price" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" :placeholder="this.product.price" step="0.01">
                        </div>
                        <div class="w-1/2 sm:w-1/4">
                            <label class="block text-white text-sm font-semibold" for="discount">
                                Discount
                            </label>
                            <input v-model="newProduct.discount" name="discount" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" :placeholder="this.product.discount + ' %'">
                        </div>
                        <div class="w-1/2 sm:w-1/4">
                            <label class="block text-white text-sm font-semibold" for="stock">
                                Stock
                            </label>
                            <input v-model="newProduct.stock" name="stock" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" type="number" :placeholder="this.product.stock">
                        </div>
                    </div>
                    <div class="w-full px-3 mb-8">
                        <label class="block text-white text-sm font-semibold" for="category">
                            Category
                        </label>
                        <select v-model="newProduct.category" name="category" class="appearance-none border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none">
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
                        <textarea v-model="newProduct.description" name="description" class="border-2 border-gray-800 rounded-lg block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" :placeholder="this.product.description" rows="10" cols="30"></textarea>
                    </div>
                </div>

                <div class="flex flex-col w-full mx-auto mt-4 lg:mt-0 justify-evenly">
                    <div class="flex flex-col">
                        <template v-if="this.product.images && this.product.images.length > 0">
                            <div v-for="image in this.product.images" class="w-full">
                            <img :src="imgUrl + image.image" class="w-1/2 xl:w-1/3 mx-auto mb-10 lg:mb-0" width="200px"/>
                            <input class="w-2/3" type="file" multiple accept="image/jpeg"
                             @change="changeFile($event, image)" />
                            </div>
                        </template>
                        <template v-else>
                            <input class="w-2/3" type="file" multiple accept="image/jpeg"
                             @change="changeFile($event, null)" />
                            <input class="w-2/3" type="file" multiple accept="image/jpeg"
                             @change="changeFile($event, null)" />
                            <input class="w-2/3" type="file" multiple accept="image/jpeg"
                             @change="changeFile($event, null)" />
                        </template>
                    </div>

                    <div class="w-full px-3 mb-8">
                        <input @click="updateProduct" type="submit" value="Update" class="w-2/3 py-1 cursor-pointer shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
                </div>
            </div>
        </div>
    
    </div>

</template>

<script>
import { productMixin } from '@/mixins/productMixin'
import { messageMixin } from '@/mixins/messageMixin'

    export default {
        mixins: [productMixin, messageMixin],
        
        props: {
            id: {
                required: true
            },
        },

        data() {
            return {
                categories: {},
                product: {},
                newProduct: {
                    name: '',
                    price: '',
                    discount: '',
                    stock: '',
                    category: '',
                    description: '',
                    images: [],
                    image_ids: []
                },
                img_urls: [],
                emptyForm: true,
                image_id: 0
            }
        },

        methods: {

            changeFile(event, img) {
                let file = event.target.files[0]
                this.img_urls.push(URL.createObjectURL(file))
                this.newProduct.images.push(file)

                if(img !== null) {
                    const index = this.product.images.findIndex(function (x) { return x.id  == img.id })
                    this.newProduct.image_ids.push(img.id)
                    const imagePreview = { id: img.id, image: file.name }
                    this.product.images.splice(index, 1, imagePreview )
                }
                
            },

            updateProduct() {
                let data = new FormData()
                if(this.newProduct.images.length > 0) {
                    this.emptyForm = false
                }
                if(this.product.name != this.newProduct.name && this.newProduct.name.length > 4) {
                    data.append('name', this.newProduct.name)
                    this.emptyForm = false
                }
                if(this.newProduct.price && this.product.price != this.newProduct.price) {
                    data.append('price', this.newProduct.price)
                    this.emptyForm = false
                }
                if(this.newProduct.discount < 100 && this.product.discount != this.newProduct.discount) {
                    data.append('discount', this.newProduct.discount)
                    this.emptyForm = false
                }
                if(this.newProduct.stock && this.product.stock != this.newProduct.stock) {
                    data.append('stock', this.newProduct.stock)
                    this.emptyForm = false
                }
                if(this.newProduct.category && this.product.category != this.newProduct.category) {
                    data.append('category', this.newProduct.category)
                    this.emptyForm = false
                }
                if(this.product.description != this.newProduct.description && this.newProduct.description.length > 5) {
                    data.append('description', this.newProduct.description)
                    this.emptyForm = false
                }

                if(!this.emptyForm) {
                    data.append('id', this.product.id)
                } else {
                    this.error = true
                    this.showMessage('You need to change something to update the product')
                    return false
                }
                
                let i = 0

                this.newProduct.images.forEach(image => {
                    data.append(`images[${i}]`, image)
                    i++
                })

                if(this.newProduct.image_ids) {
                    i = 0
                    this.newProduct.image_ids.forEach(image_id => {
                        data.append(`ids[${i}]`, image_id)
                        i++
                    })
                }
                
                data.append('images', this.newProduct.images)
                this.$store.dispatch('product/updateProduct', data)
                .then((response) => {
                    if(!response.status === 200) {
                        this.error = true
                        this.showMessage('Something went wrong')
                        return false
                    }
                    this.showMessage('Product has been successfully updated')
                })
            },

            getProduct() {
                this.$store.dispatch('product/fetchProduct', this.id)
                .then((response) => {
                    this.product = response.data.product
                })
            },

            getCategories() {
                this.$store.dispatch('category/fetchCategories')
                .then((response) => {
                    this.categories = response.data.categories
                })
            }
        },

        mounted() {
            this.getProduct()
            this.getCategories()
        }
    }
</script>

<style lang="scss" scoped>

</style>