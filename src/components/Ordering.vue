<template>
    <div>
        <div class="box">
            <h1 class="title">Compose your crepe !
                <div class="tags has-addons is-pulled-right" v-if="!user.admin && user.uid !== session.owner">
                    <span class="tag is-link">{{ session.delivery_at | time }}</span>
                </div>
                <div class="time-select" v-else>
                    <b-timepicker
                    :value="session.delivery_at"
                    :min-time="minTime"
                    :max-time="maxTime"
                    placeholder="Select a time..."
                    icon="clock"
                    icon-pack="fas"
                    :increment-minutes="5"
                    :inline="true"
                    size="is-small"
                    @input="setTime"
                    />
                </div>
            </h1>
            <h5 class="subtitle is-6">Only 8€</h5>
            <div class="field">
                <label class="label">Main crepe</label>
                <div class="control">
                    <div class="buttons">
                        <ingredient
                            v-for="ingredient in ingredients"
                            :key="ingredient"
                            :ingredient="ingredient"
                            :selected="menu.ingredients.includes(ingredient)"
                            @click.native="toggleIngredients(ingredient)"
                            />
                    </div>
                </div>
                <p class="help" v-if="menu.ingredients.length"> {{ menu.ingredients.length }} / 3 </p>
            </div>
            <b-field label="Sweet crepe">
                <div class="buttons">
                    <ingredient
                        v-for="dessert in desserts"
                        :key="dessert"
                        :ingredient="dessert"
                        :selected="dessert === menu.dessert"
                        :dessert="true"
                        @click.native="setDessert(dessert)"
                        />
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
import { menuSessionUser$ } from '@/observables/menu'
import { synchronyseMenu } from '@/services/menu'
import { Menu } from '@/types/menu'
import { Session } from '@/types/session'
import { currentUser$ } from '@/observables/user'
import { User } from '@/types/user'
import { FLAVOR } from '@/types/jam-flavors'
import Ingredient from '@/components/Ingredient.vue'
import { setTime } from '@/services/session'

export default Vue.extend({
    data: () => ({
        ingredients: Object.values(INGREDIENT) as INGREDIENT[],
        desserts: Object.values(DESSERT) as DESSERT[],
        flavors: Object.values(FLAVOR) as FLAVOR[],
        menu: {
            ingredients: [] as INGREDIENT[],
            dessert: null as DESSERT | null,
            flavor: null as FLAVOR | null,
        } as Menu,
        displayEditDelivery: false,
        minTime: {} as Date,
        maxTime: {} as Date,
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
        this.minTime = new Date()
        this.maxTime = new Date()

        this.minTime.setHours(11)
        this.minTime.setMinutes(0)
        this.maxTime.setHours(15)
        this.maxTime.setMinutes(0)
        if (
            this.user
            && this.session.menus
            && this.session.menus[this.user.uid]
        ) {
            this.menu = this.session.menus[this.user.uid]
        }

        menuSessionUser$(this.session.id, this.user.uid).subscribe((menu)  => {
            if (!menu) {
                this.menu = {
                    ingredients: [],
                    dessert: null,
                    flavor: null,
                }
            }
        })
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
        setTime(time: Date) {
            setTime(time, this.session.id)
        },
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
    components: {
        Ingredient,
    },
})
</script>

<style lang="scss" scoped>
    .time-select {
        float: right;
        .timepicker {
            display: inline;
        }
    }
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
