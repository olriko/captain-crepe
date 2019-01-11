<template>
  <div class="session" v-if="session">
    <div class="columns">
      <div class="column is-two-thirds">
        <b-field>
          <b-input :value="location"  expanded></b-input>
          <p class="control">
              <button v-clipboard:copy="location" class="button is-primary">Share</button>
          </p>
        </b-field>
        <ordering v-if="!!user && !session.locked" :session="session" :user="user"/>
        <div class="box has-text-centered" v-if="!user && !session.locked">
            <i class="fas fa-sign-in-alt"></i>
            <p>You have to be logged in to order !</p>
        </div>
        <div class="box has-text-centered" v-if="session.locked">
          <i class="fas fa-lock"></i>
          <p>Session locked</p>
        </div>
      </div>
      <div class="column">
          <manage v-if="session && (isOwner || isAdmin)" :user="user" :session-id="session.id"/>
          <menus :session="session"/>
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
import Manage from '@/components/Manage.vue'
import { currentUser$ } from '@/observables/user'
import { session$ } from '@/observables/session'
import { Session } from '@/types/session'
import { User } from '@/types/user'

export default Vue.extend({
  name: 'session',
  components: {
    Ordering,
    Menus,
    Manage,
  },
  data: () => ({
    user: undefined as User | undefined,
    session: undefined as Session | undefined,
  }),
  created() {
    currentUser$.subscribe((user) => {
      this.user = user
    })
    session$(this.$route.params.session).subscribe((session: Session) => {
      this.session = session
    })
  },
  computed: {
    location() {
      return window.location.href
    },
    isOwner(): boolean {
      if (this.session && this.user && this.session.owner === this.user.uid) {
        return true
      }
      return false
    },
    isAdmin(): boolean {
      if (this.user && this.user.admin && this.user.admin === true) {
        return true
      }
      return false
    }
  },
})
</script>

<style lang="scss" scoped>
  .box {
    i {
      font-size: 6rem;
      color: $primary;
    }
    p {
      margin-top: 10px;
      font-weight: 600;
    }
  }
</style>

