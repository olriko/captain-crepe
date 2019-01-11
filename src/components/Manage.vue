<template>
    <div class="buttons">
        <button class="button is-info"  @click="lockToggle">
            <span class="icon is-small">
                <i :class="locked ? 'fas fa-lock' : 'fas fa-lock-open'"></i>
            </span>
            <span>
                Lock
            </span>
        </button>
        <button class="button" @click="slackNotification">
            <span class="icon is-small">
                <i class="fab fa-slack-hash"></i>
            </span>
            <span>
                Share on Slack
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import { lockToggle } from '@/services/session'
import { notification } from '@/services/slack'
import { session$ } from '@/observables/session'
import { map } from 'rxjs/operators'
import { User } from '@/types/user'

export default Vue.extend({
    props: {
        sessionId: String,
         user: {
            type: Object,
            required: true,
        } as PropOptions<User>,
    },
    data: () => ({
        locked: false,
    }),
    created() {
        session$(this.sessionId).pipe(
            map((session) => session.locked),
        ).subscribe((locked) => {
            this.locked = locked
        })
    },
    methods: {
        async lockToggle() {
            await lockToggle(this.sessionId)
        },
        async slackNotification() {
            await notification(
                `:captain-crepe: Hi, ${this.user.displayName} has opened a new <${window.location.href}|session>`,
            )
        },
    },
})
</script>
