<template>
    <div class="home">
        <product-list />
        <app-footer />
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
    name: "Home",

    components: {
        ProductList,
        AppFooter
    },

}
</script>
