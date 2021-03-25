<template>
    <div id="app" v-cloak>
      <admin-layout v-if="this.$route.meta.layout === 'admin'"></admin-layout>    
      <main-layout v-else></main-layout>    
    </div>
</template>

<script>

import MainLayout from './views/main/layouts/MainLayout'
import AdminLayout from './views/admin/layouts/AdminLayout'

export default {
  components: {
    'main-layout': MainLayout,
    'admin-layout': AdminLayout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
