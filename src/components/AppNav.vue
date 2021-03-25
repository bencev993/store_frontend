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
                        <li><router-link to="/register" class="px-4 hover:text-linkcolor" href="#">Sign Up</router-link></li>
                        <li><router-link to="/login" class="px-4 hover:text-linkcolor" href="#">Login</router-link></li>
                    </template>
                    <template v-else-if="isAdmin">
                        <li><router-link to="/dashboard" class="px-4 hover:text-linkcolor" href="#">Dashboard</router-link></li>
                        <li><a href="#" class="px-4 hover:text-linkcolor" @click.prevent="logout">Logout</a></li>
                    </template>
                    <template v-else>
                        <li><router-link to="/profile" class="px-4 hover:text-linkcolor" href="#">Profile</router-link></li>
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
                        <span class="line line1 group-hover:bg-primary"></span>
                        <span class="line line2 group-hover:bg-primary"></span>
                        <span class="line line3 group-hover:bg-primary"></span>
                    </div>
                </div>
                <ul v-if="closeMenu || screenWidth >= 1024" class="list-none font-bold italic flex flex-col py-2 place-items-center justify-end mx-auto lg:w-full lg:flex-row lg:-mr-8">
                    <li class="my-2 lg:my-4 lg:ml-auto">
                        <router-link to="/" class="px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary">
                            Home
                        </router-link>
                    </li>
                    <li class="my-2 lg:my-4"><a class="px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary"
                        href="#team" @click.prevent="routeName() === 'front' ? scrollTo('team') : toFrontPage()">Team</a>
                    </li>
                    <li class="my-2 lg:my-4"><a class="px-20 lg:px-10 py-2 border border-transparent text-textdefault hover:text-linkcolor focus:border-primary"
                        href="#contact" @click.prevent="routeName() === 'front' ? scrollTo('contact') : toFrontPage()">Contact</a>
                    </li>
                    <li class="border-white border-2 rounded-full hover:shadow-lg hover:bg-bgsecondary hover:border-transparent lg:ml-auto">
                        <router-link to="/cart" class="flex px-6 py-1">
                            <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="text-lg">4</span>
                            <!-- <span class="text-lg">{{ Session::has('cart') ? Session::get('cart')->totalQuantity : '' }}</span> -->
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
            closeMenu: false,
            toggleClicked: false,
            screenWidth: window.innerWidth,
        }
    },
    
    computed : {
        ...authComputed
    },

    mounted() {
        window.addEventListener('resize', this.resizeWidth)

        let theme = localStorage.getItem('theme');

        if (theme === 'light') {
            document.documentElement.setAttribute('theme', 'light')
            this.toggleClicked = true
        } else {
            document.documentElement.setAttribute('theme', 'dark');
            this.toggleClicked = false
        }
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
