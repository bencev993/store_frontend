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