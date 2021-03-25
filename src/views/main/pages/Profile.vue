<template>
    <div class="px-5 mt-24 mx-auto md:px-20 md:mt-20 md:pt-10 md:pr-16">
        <h2>Profile Page</h2>
        <h2 @click="getUsers">adssfa</h2>
    </div>
</template>

<script>
import { apiClient } from '@/api/client.js';

export default {
    methods: {
        getUsers() {
            apiClient.get('/profile')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>