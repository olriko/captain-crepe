<template>
<div class="home">
  <div class="columns is-centered">
    <div class="column is-half">
      <button @click="onCreateSession()" class="button is-large is-primary is-fullwidth">Begin a session</button>
    </div>
  </div>
  <div class="columns is-centered">
      <div class="column is-half">
        <article class="message">
          <div class="message-header">
            <p>Active sessions</p>
          </div>
          <div class="message-body">
            <session-button v-for="(session, index) in sessions" :id="index" :session="session" :key="index"/>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isAuth } from '@/observables/user'
import { createSession } from '@/services/session'
import { sessionList$ } from '@/observables/session'
import SessionButton from '@/components/SessionButton.vue'
import { Sessions } from '@/types/session'

export default Vue.extend({
  name: 'home',
  data: () => ({
    sessions: {} as Sessions,
  }),
  components: {
    SessionButton,
  },
  created() {
    sessionList$.subscribe((sessions: Sessions) => {
      this.sessions = sessions
    })
  },
  methods: {
    onCreateSession() {
      if (!isAuth) {
        this.isNotAuthWarning()
      }
      const sessionId = createSession()

      if (sessionId) {
        this.$router.push({ name: 'session', params: { session: sessionId } })
      }
    },
    isNotAuthWarning() {
      this.$snackbar.open({
        message: `Your must be registered !`,
        type: 'is-warning',
        position: 'is-top',
      })
    },
  },
})
</script>
