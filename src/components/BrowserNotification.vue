<template>
    <div v-if="isAuth && display" class="browser-notification">
        <b-notification type="is-info" icon-pack="fas" has-icon @close="cancel()">
            <div class="content">
                <h3>Enable notification browser</h3>
                <p>To be notified when crepes are in the kitchen</p>
                <button class="button" @click="authorize()">Enable</button>
            </div>
        </b-notification>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isAuth$ } from '@/observables/user'
import { browserNotification } from '@/services/browser-notification'

export default Vue.extend({
    data: () => ({
        isAuth: false,
        display: false,
    }),
    created() {
        const status = localStorage.getItem('notification_status')

        if (!status || status === 'default') {
            this.display = true
        }
        isAuth$.subscribe((isAuth) => {
            this.isAuth = isAuth
        })
    },
    methods: {
        async authorize() {
            const status = await Notification.requestPermission()
            localStorage.setItem('notification_status', status)
            this.display = false
            browserNotification('Tonnerre de Brest !')
        },
        cancel() {
            localStorage.setItem('notification_status', 'denied')
            this.display = false
        },
    },
})
</script>

<style lang="scss" scoped>
    .browser-notification {
        max-width: 600px;
        padding: 10px;
        position: fixed;
        right: 10px;
        bottom: 10px;
    }
</style>


