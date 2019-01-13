<template>
    <div>
        <div class="box">
            <h1 class="title">Compose your crepe !</h1>
            <div class="field">
                <label class="label">Main crepe</label>
                <div class="control">
                    <div class="buttons">
                        <button
                            @click="toggleIngredients(ingredient)"
                            :class="menu.ingredients.includes(ingredient) ? 'button is-outlined is-info is-small' : 'button is-info is-small'"
                            v-for="ingredient in ingredients" :key="ingredient">
                                {{ ingredient }}
                            </button>
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
                <div class="buttons">
                    <button
                        @click="setDessert(dessert)"
                        :class="dessert === menu.dessert ? 'button is-danger is-outlined is-small' : 'button is-danger is-small'"
                        v-for="dessert in desserts"
                        :key="dessert">
                            {{ dessert }}
                    </button>
                </div>
            </b-field>
            <b-field>
                <div class="buttons" v-if="menu.dessert === 'jam'">
                    <button
                        v-for="flavor in flavors"
                        @click="setFlavor(flavor)"
                        :class="flavor === menu.flavor ? 'button is-outlined  is-link is-small' : 'button is-link is-small'"
                        :key="flavor">
                            {{ flavor }}
                    </button>
                </div>
            </b-field>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import { INGREDIENT } from '@/types/ingredients'
import { DESSERT } from '@/types/desserts'
import { synchronyseMenu } from '@/services/menu'
import { Menu } from '@/types/menu'
import { Session } from '@/types/session'
import { currentUser$ } from '@/observables/user'
import { User } from '@/types/user'
import { FLAVOR } from '@/types/jam-flavors'

export default Vue.extend({
    data: () => ({
        ingredients: Object.values(INGREDIENT) as INGREDIENT[],
        desserts: Object.values(DESSERT) as DESSERT[],
        flavors: Object.values(FLAVOR) as FLAVOR[],
        menu: {
            ingredients: [] as INGREDIENT[],
            dessert: undefined as DESSERT | undefined,
            flavor: undefined as FLAVOR | undefined,
            mirror: false,
        } as Menu,
    }),
    props: {
        session: {
            type: Object,
            required: true,
        } as PropOptions<Session>,
        user: {
            type: Object,
            required: true,
        } as PropOptions<User>,
    },
    created() {
        if (
            this.user
            && this.session.menus
            && this.session.menus[this.user.uid]
        ) {
            this.menu = this.session.menus[this.user.uid]
        }
    },
    watch: {
        menu: {
            async handler(menu) {
                await synchronyseMenu(this.session.id, menu)
            },
            deep: true,
        },
    },
    methods: {
        setFlavor(flavor: FLAVOR) {
            this.menu.flavor = flavor
        },
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
    .is-outlined:focus {
        background-color: transparent!important;
        &.is-danger {
            color: $danger!important;
        }

        &.is-info {
            color: $info!important;
        }

        &.is-link {
            color: $link!important;
        }
    }
</style>
