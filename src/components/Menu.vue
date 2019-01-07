<template>
    <div class="menu">
        <span class="tag name is-dark" v-if="user">{{ user.name }}</span>
        <div class="tags">
            <span :key="ingredient" v-for="ingredient in menu.ingredients" :class="ingredient === 'egg' && menu.mirror ? 'tag is-warning' :  'tag is-info'">{{ ingredient }}</span>
            <span v-if="menu.dessert" class="tag is-danger">{{ menu.dessert }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Menu } from '@/types/menu'
import { getUser } from '../services/auth'

export default Vue.extend({
    data: () => ({
        user: undefined,
    }),
    props: {
        menu: Object,
        userId: String,
    },
    async created() {
        this.user = await getUser(this.userId)
    },
    methods: {
    },
})
</script>

<style lang="scss" scoped>
    .menu {
        margin-left: 1rem;
        margin-bottom: 0.5rem;
    }

    .name {
        margin-bottom: 0.5rem;
    }

    .tags {
        margin-bottom: 1rem;
    }
</style>