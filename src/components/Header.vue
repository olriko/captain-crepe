<template>
    <section class="hero is-small is-dark is-bold">
    <div class="hero-body">
      <div class="container">
      <div class="columns">
        <div class="column">
            <h1 class="title">
            <router-link to="/">Make My Crepes !</router-link>
            </h1>
            <h2 class="subtitle">
            An easy way to order crepes ...
            </h2>
        </div>
        <div class="column is-one-quarter">
            <b-field v-if="!user">
                <b-input placeholder="Username" v-model="name" maxlength="20" :loading="loading" expanded></b-input>
                <p class="control">
                    <button @click="onRegister" class="button is-primary">Register</button>
                </p>
            </b-field>
            <div v-else class="has-text-centered">
                <h1 class="subtitle"> Welcome {{ user.name }} </h1>
                <online/>
            </div>
        </div>
      </div>
    </div>
    </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { register } from '@/services/auth'
import { currentUser$ } from '@/observables/user'
import { User } from '@/types/user'
import Online from '@/components/Online.vue'

export default Vue.extend({
  data: () => ({
      user: undefined as User | undefined,
      loading: false,
      name: '',
  }),
  components: {
      Online,
  },
  created() {
    currentUser$.subscribe((user) => {
        this.loading = false
        this.user = user
    })
  },
  methods: {
      onRegister() {
        if (this.name.length > 0) {
            this.loading = true
            register(this.name)
        }
      },
  },
})
</script>
