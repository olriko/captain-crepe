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
        <h6 class="title is-6" v-show="wrappedMain.length">Wrapped menus</h6>
        <ul>
            <li v-for="(wrap, index) in wrappedMain" :key="index">
                <div class="tags has-addons">
                    <span class="tag is-info">{{ wrap[0] }}</span>
                    <span class="tag is-dark">{{ wrap[1] }}</span>
                </div>
            </li>
        </ul>
        <ul>
            <li v-for="(wrap, index) in wrappedDessert" :key="index">
                <div class="tags has-addons">
                    <span class="tag is-danger">{{ wrap[0] }}</span>
                    <span class="tag is-dark">{{ wrap[1] }}</span>
                </div>
            </li>
        </ul>
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
    computed: {
        wrappedMain(): Array<[string, number]> {
            const wrap: Map<string, number> = new Map()
            for (const key in this.menus) {
                const menu = this.menus[key]
                if (menu.ingredients && menu.ingredients.length === 3) {
                    const k = menu.ingredients.sort().join('-')
                    wrap.set(k, (wrap.get(k) || 0) + 1)
                }
            }
            return Array.from(wrap).sort((m, n) => m[1] < n[1] ? 1 : -1)
        },
        wrappedDessert(): Array<[string, number]> {
            const wrap: Map<string, number> = new Map()
            for (const key in this.menus) {
                const menu = this.menus[key]
                if (menu.dessert) {
                    wrap.set(menu.dessert, (wrap.get(menu.dessert) || 0) + 1)
                }
            }
            return Array.from(wrap).sort((m, n) => m[1] < n[1] ? 1 : -1)
        },
    },
})
</script>

<style lang="scss" scoped>
    ul {
        li {
            margin-top: 5px; 
        }
    }
    h5 .tags.has-addons {
        float: right;
    }
</style>
