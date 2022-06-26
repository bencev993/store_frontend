<template>
<div class="h-screen flex flex-col">
    <nav class="tabs flex flex-col sm:flex-row px-10 py-2 mb-2">
        <router-link :to="{name: 'dashboard-order'}" class="text-sm tracking-widest text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 active">
            <svg class="w-10 p-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
        </router-link>
    </nav>
    <div class="my-auto text-center text-xs sm:text-sm lg:w-4/5 lg:mx-auto">
        <div class="flex flex-row">
            <div class="grid grid-flow-rows w-1/2 items-center text-center py-1">
                <span class="py-2 bg-gray-200">Id</span>
                <span class="py-2">Name</span>
                <span class="py-2 bg-gray-200">Address</span>
                <span class="py-2">Date</span>
                <span class="py-2 bg-gray-200">Status</span>
            </div>

            <div class="grid grid-flow-rows w-1/2 items-center text-center py-1">
                <span class="py-2 sm:bg-gray-200">#{{ this.order.id }}</span>
                <span class="max-h-90 pt-1 overflow-y-auto break-words sm:py-2 sm:max-h-full">{{ this.order.name }}</span>
                <span class="max-h-90 pt-1 overflow-y-auto break-words sm:bg-gray-200 sm:py-2 sm:max-h-full">
                    {{ order.address }}, {{ order.city }} {{ order.state }}, {{ order.zipcode }}
                </span>
                <span class="py-2">{{ order.created_at }}</span>
                <span class="py-2 sm:bg-gray-200">{{ order.status }}</span>
            </div>
        </div>

        <div class="mt-10">
            <h1 class="bg-gray-200 text-left py-1 px-6">Ordered Products</h1>
            <div class="flex flex-col">
                <div class="bg-gray-200 grid grid-cols-4 mt-5">
                    <h2 class="py-3 border-b-2 border-dashed">Id</h2>
                    <h2 class="py-3 border-b-2 border-dashed">Name</h2>
                    <h2 class="py-3 border-b-2 border-dashed">Quantity</h2>
                    <h2 class="py-3 border-b-2 border-dashed">Price</h2>
                </div>    
                <div v-for="item in cartItems" :key=item.id class="grid grid-cols-4 mt-5">    
                    
                        <span class="py-3 sm:mt-4 border-b-2 border-dashed">#{{ item.id }}</span>
                        <span class="py-3 sm:mt-4 border-b-2 border-dashed">{{ item.name }}</span>
                        <span class="py-3 sm:mt-4 border-b-2 border-dashed">{{ item.quantity }}</span>
                        <span class="py-3 sm:mt-4 border-b-2 border-dashed">$ {{ item.price }}</span>
                   

                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>

export default {
    props: {
        id: {
            required: true,
        }
    },

    data() {
        return {
            cartItems: '',
            order: ''
        }
    },

    mounted() {
        this.getOrderDetails()
    },

    methods: {
        getOrderDetails() {
            this.$store.dispatch('order/fetchOrder', this.id)
			.then((response) => {
                console.log(response.data)
				if(response.status === 200) {
					this.order = response.data.order
                    this.cartItems = response.data.cartItems
				} else {
                    console.log('valami nem oké')
                }
			})
        },
    }
}

</script>
