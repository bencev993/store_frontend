<template>
    <div class="h-screen flex flex-col mx-auto relative">
        <h1 class="mx-auto pt-10">Account Settings</h1>
        <div v-if="this.$data.msg_heading != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex flex-col absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.msg_heading }}</span>
        </div>
        <div class="m-auto">
            <!-- Error or success msg here ---------------------->
            
            <div class="flex flex-col">
                <div class="w-full mb-16">
                    <label class="block text-gray-600 text-sm font-semibold pb-2" for="email">
                        Email
                    </label>
                    <input v-model="email" class="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange" id="email" name="email" type="email" required placeholder="email@email.com">
                </div>
                <div class="w-full mb-4">
                    <label class="block text-gray-600 text-sm font-semibold pb-2" for="password">
                        Password
                    </label>
                    <input v-model="password" class="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange" id="password" name="password" type="password" required placeholder="******">
                </div>
                <div class="w-full mb-4">
                    <label class="block text-gray-600 text-sm font-semibold pb-2" for="password_confirmation">
                        Confirm Password
                    </label>
                    <input v-model="password_confirmation" class="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange" id="password_confirmation" name="password_confirmation" type="password" required placeholder="******">
                </div>
                <div class="w-full mt-10 sm:mb-10 lg:mb-0">
                    <input @click.prevent="update" type="submit" value="Change Password" class="w-full  border-2 shadow bg-white hover:border-4 hover:border-white hover:bg-orange hover:text-white focus:shadow-outline focus:outline-none text-orange font-bold py-2 px-4 rounded">
                </div>
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
                email: '',
                password: '',
                password_confirmation: ''
            }
        },

        methods: {
            update() {
                if(!this.validateForm()) {
                    return false
                }
                this.$store.dispatch('user/updateUser', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                .then((response) => {
                })
            },

            validateForm() {
                if(!this.email || !this.password || !this.password_confirmation) {
                    this.showMessage('Please fill in all fields')
                    this.error = true
                    return false
                }
                if(this.password !== this.password_confirmation) {
                    this.showMessage('Password and confirm password must match')
                }

                return true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>