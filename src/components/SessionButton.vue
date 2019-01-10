<template>
    <div v-if="user">
        <router-link class="button is-fullwidth" :to="{name: 'session', params: { session: id }}">{{ createdAt }} by {{ user.displayName }} </router-link>	
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Session } from '@/types/session'
import { getUser } from '@/services/auth'
import moment from 'moment'

export default Vue.extend({
    data: () => ({
        user: undefined,
    }),
    props: {
        id: String,
        session: {} as PropOptions<Session>,
    },
    computed: {
        createdAt(): string {
            return moment(this.session.created_at).format('dddd, MMMM Do YYYY')
        },
    },
    async created() {
        this.user = await getUser(this.session.owner)
    },
    methods: {
    },
})
</script>

<style lang="scss" scoped>
  .button {
    margin-bottom: 1rem;
  }
</style>