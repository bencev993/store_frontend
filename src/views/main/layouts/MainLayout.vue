<template>
    <div class="main-page">
        <navbar></navbar>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view :key="$route.path"/>
          </keep-alive>
        </transition>
    </div>
</template>

<script>

import AppNav from '@/components/AppNav'

export default {
    components: {
        'navbar': AppNav
    },

};
</script>
