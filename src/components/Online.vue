<template>
    <div class="tags">
        <span v-for="user in users" :key="user.id" class="tag is-black">{{ user.displayName }} <i class="fas fa-fw fa-circle"></i> </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { onlineUser$ } from '@/observables/user'
import { User } from '@/types/user'

export default Vue.extend({
    data: () => ({
        users: [] as  User[],
    }),
    created() {
        onlineUser$.subscribe((users: User[]) => {
            this.users = users
        })
    },
})
</script>

<style lang="scss" scoped>
    .tags {
        margin-top: 10px;
        .tag {
            i {
                color: LawnGreen;
            }
        }
    }
</style>
