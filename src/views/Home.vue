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
            <p>Last sessions</p>
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
import { currentUser$ } from '@/observables/user'
import { createSession } from '@/services/session'
import { session$ } from '@/observables/session'
import SessionButton from '@/components/SessionButton.vue'
import { Session } from '@/types/session'

export default Vue.extend({
  name: 'home',
  data: () => ({
    sessions: {} as {[s: string]: Session},
  }),
  components: {
    SessionButton,
  },
  created() {
    session$.subscribe((sessions: {[s: string]: Session}) => {
      this.sessions = sessions
    })
  },
  methods: {
    onCreateSession() {
      if (!currentUser$.value) {
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
