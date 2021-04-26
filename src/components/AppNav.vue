<template>
    <nav id="navbar" class="bg-bgprimary bg-opacity-75 text-textneutral lg:px-10">
        <div class="nav-wrap max-w-screen-lg mx-auto">
            <div class="flex flex-row mx-auto py-2 border-b border-gray-600 text-sm lg:w-full">
                <ul class="flex flex-row">
                    <li><a class="px-2 lg:px-4 hover:text-linkcolor" href="#"><font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" /></a></li>
                    <li><a class="px-2 lg:px-4 hover:text-linkcolor" href="#"><font-awesome-icon :icon="['fab', 'twitter']" size="lg" /></a></li>
                    <li><a class="px-2 lg:px-4 hover:text-linkcolor" href="#"><font-awesome-icon :icon="['fab', 'instagram']" size="lg" /></a></li>
                    <li><a class="px-2 lg:px-4 hover:text-linkcolor" href="#"><font-awesome-icon :icon="['fab', 'google-plus-g']" size="lg" /></a></li>
                    <li class="px-4 flex items-center hidden sm:block"><font-awesome-icon :icon="['fa', 'phone-alt']" size="sm" /><span class="pl-2 cursor-default">434-145-813</span></li>
                </ul>
                <ul class="ml-auto flex flex-row">
                    <template v-if="!loggedIn">
                        <li><router-link to="/register" class="px-4 hover:text-linkcolor">Sign Up</router-link></li>
                        <li><router-link to="/login" class="px-4 hover:text-linkcolor">Login</router-link></li>
                    </template>
                    <template v-else-if="isAdmin">
                        <li><router-link to="/dashboard" class="px-4 hover:text-linkcolor">Dashboard</router-link></li>
                        <li><a href="#" class="px-4 hover:text-linkcolor" @click.prevent="logout">Logout</a></li>
                    </template>
                    <template v-else>
                        <li><router-link to="/profile" class="px-4 hover:text-linkcolor">Profile</router-link></li>
                        <li><a href="#" class="px-4 hover:text-linkcolor" @click.prevent="logout">Logout</a></li>
                    </template>
                </ul>
            </div>
            <div class="grid grid-flow-row place-items-center lg:flex lg:justify-between">
                <ul class="py-5">
                    <li class="text-center text-textdefault cursor-default">
                        <span class="flex uppercase font-bold italic tracking-widest text-2xl">Nameless <h1 class="text-textprimary px-2">Store</h1></span>
                        <h3 class="text-xl tracking-widest font-semibold">Lorem ipsum</h3>
                    </li>
                </ul>
                <div class="menu-btn text-textdefault place-self-start pl-4 py-2 lg:hidden">
                    <div class="h-6 w-6 toggle-menu relative cursor-pointer group" :class="{close: closeMenu}"
                        @click="closeMenu = !closeMenu">
                        <span class="line line1 group-hover:bg-bgsecondary"></span>
                        <span class="line line2 group-hover:bg-bgsecondary"></span>
                        <span class="line line3 group-hover:bg-bgsecondary"></span>
                    </div>
                </div>
                <ul v-if="closeMenu || screenWidth >= 1024" class="list-none font-bold italic flex flex-col py-2 place-items-center justify-end mx-auto lg:w-full lg:flex-row lg:-mr-8">
                    <li class="my-2 lg:my-4 lg:ml-auto">
                        <router-link to="/" class="px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary">
                            Home
                        </router-link>
                    </li>
                    
                    <li class="toggleable hoverable px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary">
                        <input type="checkbox" value="selected" id="toggle-one" class="toggle-input">
                        <label for="toggle-one" class="block cursor-pointer lg:p-6">Categories</label>
                        <div role="toggle" class="p-6 mt-2 lg:mt-0 text-left mega-menu mb-16 z-20 sm:mb-0 shadow-xl bg-gradient-to-b from-black via-gray-600 to-gray-200">
                            <div class="container mx-auto w-full flex flex-wrap justify-between mx-2">
                                <ul v-for="category in this.categories" :key="category.parent_id" class="px-4 w-full sm:w-1/2 lg:w-1/4 border-red-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <h3 class="font-bold text-xl text-white text-bold mb-2">{{ category.parent_name }}</h3>
                                    <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                                        <router-link :to="{ name: 'category', params: { id: subcategory.id } }"
                                            class="block cursor-pointer p-3 lg:pl-24 hover:bg-white text-white hover:text-orange text-center lg:text-left">
                                            {{ subcategory.category_name }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li class="my-2 lg:my-4"><a class="px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary"
                        href="#contact" @click.prevent="routeName() === 'front' ? scrollTo('contact') : toFrontPage()">Contact</a>
                    </li>
                    <li class="border-white border-2 rounded-full hover:shadow-lg hover:bg-bgsecondary hover:border-transparent lg:ml-auto">
                        <router-link :to="countCartItems > 0 ? '/cart' : ''" class="flex px-6 py-1">
                            <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="text-lg">{{ countCartItems > 0 ? countCartItems : '' }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import { authComputed } from '../store/helpers.js';

export default {
    data() {
        return {
            categories: [],
            closeMenu: false,
            toggleClicked: false,
            screenWidth: window.innerWidth,
        }
    },
    
    computed : {
        ...authComputed,
        
        countCartItems() {
            return this.$store.getters['cart/getCountedItems']
        },

    },

    mounted() {
        this.$store.dispatch('category/fetchCategories')
        .then((response) => {
            this.categories = response.data.categories
        })

        window.addEventListener('resize', this.resizeWidth)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeWidth);
    },

    methods: {
        scrollTo(selector) {
            document.getElementById(selector).scrollIntoView({ behavior: 'smooth'})
        },

        resizeWidth() {
            this.screenWidth = window.innerWidth
        },

        routeName() {
            return this.$route.name
        },

        toFrontPage() {
            this.$router.push({ 'name': 'front'})
        },

        logout() {
            this.$store.dispatch('user/logout')
            .then(() => {
                this.$router.push({name: 'home'})
            })
        }
        
    }
}
</script>
