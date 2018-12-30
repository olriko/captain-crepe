<template>
    <div class="box">
        <h5 class="title is-5">
            Order
            <div class="tags has-addons">
                <span class="tag is-dark">{{ Object.keys(menus).length }}</span>
                <span class="tag is-info">{{ Object.keys(menus).length * 8 }} €</span>
            </div>
        </h5>
        <menu-item v-for="(menu, userId) in menus" :key="userId" :userId="userId" :menu="menu"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { menusFromSession$ } from '@/observables/menu'
import { Menu as MenuType } from '@/types/menu'
import MenuItem from './Menu.vue'

export default Vue.extend({
    data: () => ({
        menus: {} as {[s: string]: MenuType},
    }),
    components: {
        MenuItem,
    },
    props: {
        sessionId: String,
    },
    created() {
        menusFromSession$(this.sessionId).subscribe((menus: {[s: string]: MenuType}) => {
            this.menus = menus || {}
        })
    },
    methods: {
    },
})
</script>

<style lang="scss" scoped>
    .tags.has-addons {
        float: right;
    }
</style>