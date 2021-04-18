<template>
    <div class="container-fluid flex flex-col h-screen lg:flex-row">
        <div id="menu-btn" class="flex lg:hidden">
            <a class="ml-auto cursor-pointer" @click="toggleMenu">
                <svg class="w-12 p-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
        </div>
        <div id="sidebar" ref="sidebar" class="hidden w-full mb-10 lg:mb-0 lg:block lg:fixed lg:w-3/12 xl:w-2/12">
            <sidebar></sidebar>
        </div>
        <div class="w-full sm:ml-auto lg:w-9/12 xl:w-10/12 flex">
            <transition name="fade" mode="out-in">
                <router-view class="w-full" />
            </transition>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar'

export default {
    components: {
        'sidebar': Sidebar
    },

    data() {
        return {
            isHidden: true
        }
    },

    methods: {
        toggleMenu() {
            this.isHidden 
            ? this.$refs.sidebar.classList.remove('hidden') 
            : this.$refs.sidebar.classList.add('hidden')
            this.isHidden = !this.isHidden
        }
    }
}
</script>

<style lang="scss" scoped>

</style>