<template>
    <div class="box" v-if="session">
        <h5 class="title is-5">
            Order
            <div class="tags has-addons">
                <span class="tag is-dark">{{ Object.keys(session.menus).length }}</span>
                <span class="tag is-info">{{ Object.keys(session.menus).length * 8 }} €</span>
            </div>
        </h5>
        <menu-item v-for="(menu, userId) in session.menus" :key="userId" :userId="userId" :menu="menu"/>
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
import Vue, { PropOptions } from 'vue'
import { Menu as MenuType } from '@/types/menu'
import MenuItem from './Menu.vue'
import { Session } from '@/types/session'

export default Vue.extend({
    components: {
        MenuItem,
    },
    props: {
        session: {
            type: Object,
            required: true,
        } as PropOptions<Session>,
    },
    computed: {
        wrappedMain(): Array<[string, number]> {
            const wrap: Map<string, number> = new Map()
            if (this.session.menus) {
                for (const key in this.session.menus) {
                    const menu = this.session.menus[key]
                    if (menu.ingredients && menu.ingredients.length === 3) {
                        const k = menu.ingredients.sort().join('-')
                        wrap.set(k, (wrap.get(k) || 0) + 1)
                    }
                }
            }
            return Array.from(wrap).sort((m, n) => m[1] < n[1] ? 1 : -1)
        },
        wrappedDessert(): Array<[string, number]> {
            const wrap: Map<string, number> = new Map()
            if (this.session.menus) {
                for (const key in this.session.menus) {
                    const menu = this.session.menus[key]
                    if (menu.dessert) {
                        wrap.set(menu.dessert, (wrap.get(menu.dessert) || 0) + 1)
                    }
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
