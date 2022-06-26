<template>
    <router-link v-if="order.id" :to="{ name: 'dashboard-order-edit', params:{ id: order.id } }">
        <div v-if="this.$data.msg_heading != '' " :class="this.$data.error == true ? 'bg-red-600' : 'bg-green-600' " class="flex flex-col z-10 absolute-center text-white font-semibold h-24 w-2/3 p-2 rounded-lg">
            <span class="m-auto">{{ this.$data.msg_heading }}</span>
        </div>
        <div :class="statusBtnOn ? 'md:border md:border-t-2 md:border-b-2 md:border-red-400 md:rounded-xl' : ''" class="grid grid-cols-2 mb-10 md:mb-0 sm:px-6 sm:grid-cols-12 py-1 pr-6 items-center border-b dotted md:border md:border-t-2 md:border-b-2 md:border-transparent">
            <span>#{{ order.id }}</span>
            <span class="sm:col-span-3">{{ order.name }}</span>
            <span class="sm:col-span-4">{{ order.address }}, {{ order.city }} {{ order.state }}, {{ order.zipcode }}</span>
            <span class="sm:col-span-4 md:col-span-2">{{ order.created_at }}</span>
            <li @mouseover="statusBtnOn = true" @mouseleave="statusBtnOn = false"   class="hidden w-full list-none border relative border-white text-white outline-none focus:outline-none focus:shadow-none hover:border-transparent hover:bg-white order-options ml-auto p-2 md:col-span-2 md:flex">
                <span v-if="order.status === 'Pending'" class="ml-auto w-full py-1 bg-red-500 border-1 rounded-md">{{ order.status }}</span>
                <span v-if="order.status === 'Dispatched'" class="ml-auto w-full py-1 bg-gray-500 border-1 rounded-md">{{ order.status }}</span>
                <span v-if="order.status === 'Completed'" class="ml-auto w-full py-1 bg-green-500 border-1 rounded-md">{{ order.status }}</span>
                <ul v-if="statusBtnOn" class="absolute top-10 right-1 w-full bg-white text-white z-10 border-b shadow-inner">
                    <li v-if="order.status !== 'Pending'">
                        <button @click.prevent="changeStatus(order.id, 'Pending')" class="text-white bg-red-500 hover:bg-red-400 border-1 rounded-md mb-1 py-1 w-full cursor-pointer">Pending</button>
                    </li>
                    <li v-if="order.status !== 'Dispatched'">
                        <input type="hidden" name="status" value="Dispatched">
                        <input type="hidden" name="id" :value="order.id">
                        <button @click.prevent="changeStatus(order.id, 'Dispatched')" class="bg-gray-500 hover:bg-gray-400 border-1 rounded-md mb-1 py-1 w-full cursor-pointer">Dispatched</button>
                    </li>
                    <li v-if="order.status !== 'Completed'">
                        <input type="hidden" name="status" value="Completed">
                        <input type="hidden" name="id" :value="order.id">
                        <button @click.prevent="changeStatus(order.id, 'Completed')" class="bg-green-500 hover:bg-green-400 border-1 rounded-md mb-1 py-1 w-full cursor-pointer">Completed</button>
                    </li>
                    <li>
                        <input type="hidden" name="status" value="Remove">
                        <input type="hidden" name="id" :value="order.id">
                        <button @click.prevent="changeStatus(order.id)" class="bg-red-500 hover:bg-red-400 border-1 rounded-md mb-1 py-1 w-full cursor-pointer">Remove</button>
                    </li>
                </ul>
            </li>
        </div>
    </router-link>
</template>

<script>
import { messageMixin } from '@/mixins/messageMixin'
import { productMixin } from '@/mixins/productMixin'

export default {
    mixins: [productMixin, messageMixin],

    props: {
        order: {
            required: true,
            type: Object
        }
    },

    data() {
        return {
            error: false,
            statusBtnOn: false,
        }
    },

    methods: {
        changeStatus(id, status = '') {
            if(!status) {
                if(confirm('Are you sure you want to delete this order?')) {
                    this.$store.dispatch('order/updateOrder', {
                        'id': id,
                        'status': null
                    })
                    .then((response) => {
                        if(response.status === 200) {
                            this.showMessage('Order successfully deleted')
                            setTimeout(() => {
                                this.$emit('reset')
                            }, 3000)
                        }
                    })
                }
            } else {
                this.$store.dispatch('order/updateOrder', {
                    'id': id,
                    'status': status
                })
                .then((response) => {
                    if(response.status === 200) {
                        this.showMessage('Order status successfully changed')
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