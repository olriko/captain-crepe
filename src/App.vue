<template>
  <div id="app">
    <top/>
      <div id="view" class="container">
          <transition name="fade">
            <router-view/>
          </transition>
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
    margin-bottom: 15vh;
  }
</style>
