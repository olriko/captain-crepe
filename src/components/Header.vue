<template>
    <section class="hero is-small is-dark is-bold">
    <div class="hero-body">
      <div class="container">
      <div class="columns">
        <div class="column">
            <h1 class="title">
                <router-link to="/"><img class="logo" src="../images/logo.png"/>Captain Crepes !</router-link>
            </h1>
            <h2 class="subtitle">An easy way to order crepes ...</h2>
        </div>
        <div class="column is-one-quarter">
            <b-field v-if="!user">
                <button @click="onLogin" class="button is-primary is-rounded">
                    <span class="icon">
                        <i class="fab fa-google fa-fw"></i>
                    </span>
                    <span> Login </span>
                </button>
            </b-field>
            <div v-else>
                <div @click="onLogout" class="user">
                    <div class="picture">
                        <img :src="user.photoURL">
                    </div>
                    <div class="name">
                        {{ user.displayName }}
                    </div>
                </div>
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
import { login, logout } from '@/services/auth'
import { currentUser$ } from '@/observables/user'
import { User } from '@/types/user'
import Online from '@/components/Online.vue'

export default Vue.extend({
  data: () => ({
      user: undefined as User | undefined,
      loading: false,
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
      onLogin() {
        this.loading = true
        login()
      },
      onLogout() {
          logout()
      },
  },
})
</script>

<style lang="scss" scoped>
    h1.title {
        font-family: 'Sigmar One', cursive;
    }
    .logo {
        width: 40px;
        height: 40px;
    }

    $heightUser: 40px;
    .user {
        cursor: pointer;
        border-radius: $heightUser / 2;
        background-color: $grey-dark;
        min-width: 160px;
        padding-right: 10px;
        display: inline-block;
        height: $heightUser;
        .picture {
            display: inline-block;
            border-radius: $heightUser / 2;
            width: $heightUser;
            height: $heightUser;
            img {
                border-radius: $heightUser / 2;
            }
        }

        .name {
            display: inline-block;
            height: $heightUser;
            vertical-align: top;
            padding: $heightUser / 5;
        }
    }
</style>
