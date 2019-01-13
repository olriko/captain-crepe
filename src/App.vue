<template>
  <div id="app">
    <top/>
      <div id="view" class="container">
          <transition name="fade">
            <router-view/>
          </transition>
      </div>
    <bottom/>
    <browser-notification/>
  </div>
</template>

<script>
import Vue from 'vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import BrowserNotification from '@/components/BrowserNotification.vue'


export default Vue.extend({
  name: 'app',
  components: {
    top: Header,
    bottom: Footer,
    BrowserNotification,
  },
})
</script>

<style lang="scss">
  #view {
    padding: 1rem;
    margin-bottom: 15vh;
  }
</style>
