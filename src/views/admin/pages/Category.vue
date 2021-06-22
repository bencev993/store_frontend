<template>

    <div class="relative grid grid-cols mx-auto text-center text-xs w-full sm:text-sm lg:w-4/5 lg:h-screen lg:overflow-hidden lg:flex lg:flex-row xl:w-full">
        <div v-if="this.$data.error_msg != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex z-10 absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>
        <div class="my-auto lg:flex-1">
            <div class="grid grid-cols sm:px-6">
                <div class="flex flex-col mx-auto w-auto lg:w-full xl:w-3/4 bg-gradient-to-r from-blue-600 via-blue-600 to-teal-500 py-4 px-8 rounded-lg shadow-lg shadow-outer">
                    <div class="w-full px-3 mb-8">
                        <label class="block text-white text-sm font-semibold" for="category">Category Name</label>
                        <input v-model="category.name" class="border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-gray-300 placeholder-opacity-50 text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none" name="category" type="text" required placeholder="Category">
                    </div>

                    <div class="w-full px-3 mb-8">
                        <label class="block text-white text-sm font-semibold" for="parent">
                            Select Parent Category
                        </label>
                        <select v-model="category.parent_id" name="parent" class="appearance-none border-2 border-gray-800 rounded-lg text-center block w-full p-3 mt-2 placeholder-white text-white bg-transparent focus:shadow-xl focus:shadow-outer focus:border-white focus:outline-none">
                            <option default :value="null"></option>
                            <template v-if="categories">
                                <!-- <option v-for="(category, i) in categories" :key="`${i}-${category.parent_id}`" :value="category.parent_id" class="text-black"> -->
                                <option v-for="(category, i) in this.categories" :key="`${i}-${category.parent_id}`" :value="category.parent_id" class="text-black">
                                    {{ category.parent_name }}
                                </option>
                            </template>
                        </select>
                    </div>
                    <div class="w-full px-3 mb-8">
                        <input @click.prevent="createCategory" type="submit" value="Add" class="w-2/3 py-1 cursor-pointer shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold md:py-2 px-4 rounded">
                    </div>
                </div>
            </div>
        </div>
        <category-list :categories="categories" v-on:fetch="fetchCategories"></category-list>
    </div>


</template>

<script>
import CategoryList from '../components/CategoryList'
import { messageMixin } from '@/mixins/messageMixin'

    export default {
        mixins: [messageMixin],

        components: {
            CategoryList
        },

        data() {
            return {
                categories: {},
                category: {
                    parent_id: null,
                    name: '',
                },
                error: false,
            }
        },

        mounted() {
            this.fetchCategories()
        },

        methods: {
            validateForm() {
                if(!this.category.name) {
                    this.showMessage('Category name can not be empty')
                    this.$data.error = true
                    return false
                }
                return true
            },

            createCategory() {
                if(!this.validateForm()) {
                    return false
                }

                this.$store.dispatch('category/createCategory', this.category)
                .then((response) => {
                    if(!response.status === 200) {
                        this.$data.error = true
                        this.showMessage('Something went wrong')
                        return false
                    }
                    this.showMessage('Category created successfully')
                    this.fetchCategories()
                })
            },

            deleteCategory() {
                this.$store.dispatch('category/deleteCategory', this.category)
            },

            fetchCategories() {
                this.$store.dispatch('category/fetchCategories')
                .then((response) => {
                    this.categories = response.data.categories
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>