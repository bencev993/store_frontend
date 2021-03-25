<template>
    <div class="px-5 mt-24 mx-auto md:px-20 md:mt-20 md:pt-10 md:pr-16">
        <form action="#" method="POST" class="w-full max-w-sm mx-auto">
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-full-name">
                Email
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="email" v-model="user.email" name="email" id="email" class="bg-gray-200 shadow-sm border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-400">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block font-bold md:text-center mb-1 md:mb-0 pr-4" for="inline-password">
                    Password
                </label>
                </div>
                <div class="md:w-2/3">
                <input type="password" v-model="user.password" name="password" id="password" class="bg-gray-200 shadow-sm border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-400" placeholder="******************">
                </div>
            </div>
            <div class="agreement text-center py-5 sm:pl-5">
                <span class="text-sm text-gray-600">By logging in, you agree to our <a href="#" class="text-gray-700 underline">Privacy Policy</a> and <a href="#" class="text-gray-700 underline">Terms of use</a></span>
            </div>
            <div class="w-100 md:pl-8 md:pt-4">
                <div class="w-full">
                    <button @click.prevent="login" type="submit" class="w-full shadow-md bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Sign In
                    </button>
                </div>
                <div class="w-full py-5 text-center">
                    <span class="text-sm text-gray-600">Not a Member? <router-link to="/register" class="text-gray-900 underline">Join Us</router-link></span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { authComputed } from '@/store/helpers.js';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    computed: {
        ...authComputed
    },
    methods: {
        login() {
            this.$store.dispatch('user/login', this.user)
            .then( () => {
                this.isAdmin 
                ? this.$router.push({ name: 'dashboard' })
                : this.$router.push({ name: 'profile' })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>