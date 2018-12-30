<template>
  <div class="session">
    <div class="columns">
      <div class="column is-two-thirds">
        <b-field>
          <b-input :value="location"  expanded></b-input>
          <p class="control">
              <button v-clipboard:copy="location" class="button is-primary">Share</button>
          </p>
        </b-field>
        <ordering v-if="isAuth" :session-id="$route.params.session"/>
        <article class="message is-danger" v-else>
          <div class="message-header">
            <p>Please</p>
          </div>
          <div class="message-body">
            To order, you have to be registered !
          </div>
        </article>
      </div>
      <div class="column">
          <menus :session-id="$route.params.session"/>
          <div class="tags has-addons">
              <span class="tag is-dark">Phone</span>
              <span class="tag is-primary">01 42 81 98 19</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Ordering from '@/components/Ordering.vue'
import Menus from '@/components/Menus.vue'
import { isAuth$ } from '@/observables/user'

export default Vue.extend({
  name: 'session',
  components: {
    Ordering,
    Menus,
  },
  data: () => ({
    isAuth: false,
  }),
  created() {
    isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth
    })
  },
  computed: {
    location() {
      return window.location.href
    },
  },
})
</script>
