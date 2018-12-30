<template>
  <div id="app">
    <top/>
      <div id="view" class="container">
          <router-view/>
      </div>
    <bottom/>
  </div>
</template>

<script>
import Vue from 'vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'


export default Vue.extend({
  name: 'app',
  components: {
    top: Header,
    bottom: Footer,
  },
})
</script>

<style lang="scss">
  #view {
    padding: 1rem;
  }
</style>
