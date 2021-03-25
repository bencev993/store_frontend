<template>
    <div class="container-fluid flex flex-col lg:flex-row">
        <div id="sidebar" class="hidden w-full lg:block lg:fixed lg:w-3/12 xl:w-2/12">
            <sidebar></sidebar>
        </div>
        <div class="w-full sm:ml-auto lg:w-9/12 xl:w-10/12 flex">
            <transition name="fade" mode="out-in">
                <router-view />
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
}
</script>

<style lang="scss" scoped>

</style>