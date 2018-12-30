<template>
    <div class="tags">
        <span v-for="user in users" class="tag is-black">{{ user.name }} <i class="fas fa-fw fa-circle"></i> </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { onlineUser$ } from '@/observables/user'

export default Vue.extend({
    data: () => ({
        users: [],
    }),
    created() {
        onlineUser$.subscribe((users: any) => {
            this.users = users
        })
    },
})
</script>

<style lang="scss" scoped>
    .tag {
        i {
            color: LawnGreen;
        }
    }
</style>
