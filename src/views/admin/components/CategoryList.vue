<template>
    <div class="flex items-center lg:flex-1 relative">
        <div v-if="this.$data.error_msg != '' " :class="this.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex z-10 absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.error_msg }}</span>
        </div>
        <div class="flex flex-col list-none mx-auto w-2/3 max-h-3/4 overflow-auto lg:w-4/5">
            <div v-for="(parent, i) in categories" :key="`${i}-${parent.parent_id}`">
                <ul class="bg-teal-600">
                    <div class='form-group flex items-center'>
                        <span class="block my-auto w-full text-left pl-8 text-white">{{ parent.parent_name }}</span>
                        <a @click.prevent="deleteCategory(parent.parent_id)" class="bg-gray-200 delete-category cursor-pointer">
                            <svg class="w-8 p-2 bg-red-400 hover:bg-red-600 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </a>
                        <input type="submit" class="hidden" onclick="return confirm('Are you sure you want to remove this category and all subcategories?')">
                    </div>
                </ul>
                <template v-if="parent.subcategories">
                        <li v-for="subcategory in parent.subcategories" :key="subcategory.id">
                            <div class='form-group flex items-center'>
                                <span class="block w-full p-2 text-center bg-gray-200">{{ subcategory.category_name}}</span>
                                <a @click.prevent="deleteCategory(subcategory.id)" class="delete-category cursor-pointer">
                                    <svg class="w-8 p-2 bg-red-400 hover:bg-red-600 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </a>
                                <input type="submit" class="hidden" onclick="return confirm('Are you sure you want to remove this category?')">
                            </div>
                        </li>
                </template>
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
            error: false
        }
    },

    props: {
        categories: {}
    },

    methods: {
        deleteCategory(id) {
            if(confirm('Are you sure you want to delete category?')) {
                this.$store.dispatch('category/deleteCategory', id)
                .then((response) => {
                    if(response.status === 200) {
                        this.showMessage('Category successfully deleted')
                        this.$emit('fetch')
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>