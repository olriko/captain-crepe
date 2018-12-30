<template>
    <div>
        <div class="box">
            <h1 class="title">Compose your crepe !</h1>
            <div class="field">
                <label class="label">Main crepe</label>
                <div class="control">
                    <div class="tags">
                        <span 
                            @click="toggleIngredients(ingredient)" 
                            :class="menu.ingredients.includes(ingredient) ? 'tag is-success' : 'tag is-info'" 
                            v-for="ingredient in ingredients" :key="ingredient">
                                {{ ingredient }}
                            </span>
                    </div>
                </div>
                <p class="help" v-if="menu.ingredients.length"> {{ menu.ingredients.length }} / 3 </p>
            </div>
            <b-field v-if="menu.ingredients.includes('egg')">
                <b-switch size="is-small" v-model="menu.mirror" type="is-info">
                    Egg mirror
                </b-switch>
            </b-field>
            <b-field label="Sweet crepe">
                <div class="tags">
                    <span
                        @click="setDessert(dessert)"
                        :class="dessert === menu.dessert ? 'tag is-success' : 'tag is-danger'" 
                        v-for="dessert in desserts" 
                        :key="dessert">
                            {{ dessert }}
                        </span>
                </div>
            </b-field>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { INGREDIENT } from '@/types/ingredients'
import { DESSERT } from '@/types/desserts'
import { synchronyseMenu } from '@/services/menu'
import { fetchUserCurrentMenu$ } from '@/observables/menu'
import { Menu } from '@/types/menu'

export default Vue.extend({
    data: () => ({
        ingredients: Object.values(INGREDIENT) as INGREDIENT[],
        desserts: Object.values(DESSERT) as DESSERT[],
        menu: {
            ingredients: [] as INGREDIENT[],
            dessert: null as DESSERT | null,
            mirror: false,
        } as Menu,
    }),
    props: {
        sessionId: String,
    },
    watch: {
        menu: {
            async handler(menu) {
                await synchronyseMenu(this.sessionId, menu)
            },
            deep: true,
        },
    },
    async created() {
        fetchUserCurrentMenu$(this.sessionId).subscribe((menu) => {
            if (menu) {
                this.menu = {
                    ingredients: [],
                    dessert: null,
                    mirror: false,
                    ...menu,
                }
            }
        })
    },
    methods: {
        setDessert(dessert: DESSERT) {
            this.menu.dessert = dessert
        },
        toggleIngredients(ingredient: INGREDIENT) {
            const index = this.menu.ingredients.indexOf(ingredient)
            if (index > -1) {
                this.menu.ingredients.splice(index, 1)
            } else if (this.menu.ingredients.length < 3) {
                this.menu.ingredients.push(ingredient)
            }
        },
    },
})
</script>

<style lang="scss" scoped>
    .tag {
        cursor: pointer;
    }
</style>