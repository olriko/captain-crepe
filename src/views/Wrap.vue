<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="isAuth" class="buttons">
                <button @click="back()" class="button is-black is-small">
                    <span class="icon is-small">
                        <i class="fas fa-chevron-left fa-fw"></i>
                    </span>
                    <span>Back to user orders</span>
                </button>
            </div>
           <div class="box">
               <div class="content">
                   <h2>Main crepes</h2>
                   <ul type="disc">
                       <li v-for="menu in wrappedMain" :key="menu.ingredients.toString()">
                           <div class="tags" style="display: inline">
                                <span v-for="ingredient in menu.ingredients" :key="ingredient" class="tag is-info">{{ ingredient }}</span>
                            </div>
                            <span class="count">
                                <i class="fas fa-times fa-fw"></i>
                                {{ menu.count }}
                            </span>
                       </li>
                   </ul>
                    <h2>Desserts</h2>
                    <ul type="disc">
                       <li v-for="menu in wrappedDessert" :key="menu.ingredients">
                            <span class="tag is-danger">{{ menu.dessert }}</span>
                            <span class="count">
                                <i class="fas fa-times fa-fw"></i>
                                {{ menu.count }}
                            </span>
                       </li>
                   </ul>
               </div>
           </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Session } from '@/types/session'
import { session$ } from '@/observables/session'
import { isAuth$ } from '@/observables/user'


export default Vue.extend({
    data: () => ({
        session: undefined as Session | undefined,
        isAuth: false,
    }),
    created() {
        session$(this.$route.params.session).subscribe((session: Session) => {
            this.session = session
        })

        isAuth$.subscribe((isAuth) => {
            this.isAuth = isAuth
        })
    },
    methods: {
        back() {
            this.$router.push({name: 'session', params: {session: this.$route.params.session}})
        },
    },
    computed: {
        wrappedMain(): Array<{ingredients: string[], count: number}> {
            const wrap: Map<string, number> = new Map()
            if (this.session && this.session.menus) {
                for (const key in this.session.menus) {
                    const menu = this.session.menus[key]
                    if (menu.ingredients && menu.ingredients.length === 3) {
                        const k = menu.ingredients.sort().join('-')
                        wrap.set(k, (wrap.get(k) || 0) + 1)
                    }
                }
            }
            return Array.from(wrap).sort((m, n) => m[1] < n[1] ? 1 : -1).map((menu) => ({ingredients: menu[0].split('-'), count: menu[1]}))
        },
        wrappedDessert(): Array<{dessert: string, count: number}> {
            const wrap: Map<string, number> = new Map()
            if (this.session && this.session.menus) {
                for (const key in this.session.menus) {
                    const menu = this.session.menus[key]
                    if (menu.dessert) {
                        wrap.set(menu.dessert, (wrap.get(menu.dessert) || 0) + 1)
                    }
                }
            }
            return Array.from(wrap).sort((m, n) => m[1] < n[1] ? 1 : -1).map((menu) => ({dessert: menu[0], count: menu[1]}))
        },
    },
})
</script>

<style lang="scss" scoped>
    .count {
        margin-left: 1rem;
    }
</style>
