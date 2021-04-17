<template>
    <div id="app" v-cloak>
      <admin-layout v-if="this.$route.meta.layout === 'admin'"></admin-layout>
      <not-found v-else-if="this.$route.meta.layout === '404'"></not-found>
      <main-layout v-else></main-layout>
    </div>
</template>

<script>

import MainLayout from './views/main/layouts/MainLayout'
import AdminLayout from './views/admin/layouts/AdminLayout'
import NotFound from './views/main/layouts/NotFound'

export default {
  components: {
    'main-layout': MainLayout,
    'admin-layout': AdminLayout,
    'not-found': NotFound
  }
}
</script>