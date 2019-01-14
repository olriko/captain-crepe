<template>
    <b-tooltip class="ingredient"
        :label="tooltip"
        :active="!!tooltip"
        position="is-bottom"
        :animated="true"
        >
        <button
            class="button"
            :class="{
                'is-outlined': selected,
                'is-info': !dessert,
                'is-danger': dessert,
            }"
            >
            <img
                v-if="icon"
                :src="icon"
                />
            {{ ingredient }}
        </button>
    </b-tooltip>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { INGREDIENT } from '@/types/ingredients'
import { DESSERT } from '@/types/desserts'

export default Vue.extend({
    props: {
        ingredient: {
            type: String,
            required: true,
        } as PropOptions<INGREDIENT | DESSERT>,
        selected: {
            type: Boolean,
            required: false,
        },
        dessert: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        tooltip(): string | undefined {
            switch (this.ingredient) {
                case INGREDIENT.EGG:
                    return 'Outside'
                case INGREDIENT.EGG_MIRROR:
                    return 'Inside'
            }
            return undefined
        },
        icon(): string | undefined {
            switch (this.ingredient) {
                case INGREDIENT.HAM:
                    return '/img/icons/ingredients/ham-leg.svg'
                case INGREDIENT.CHEESE:
                    return '/img/icons/ingredients/cheese.svg'
                case INGREDIENT.TURKEY:
                    return '/img/icons/ingredients/turkey.svg'
                case INGREDIENT.HAM:
                    return '/img/icons/ingredients/meat.svg'
                case INGREDIENT.MUSHROOM:
                    return '/img/icons/ingredients/mushroom.svg'
                case INGREDIENT.ONION:
                    return '/img/icons/ingredients/onion.svg'
                case INGREDIENT.BACON:
                    return '/img/icons/ingredients/bacon.svg'
                case INGREDIENT.PATATO:
                    return '/img/icons/ingredients/potato.svg'
                case INGREDIENT.CHICKEN:
                    return '/img/icons/ingredients/chicken.svg'
                case INGREDIENT.EGG:
                    return '/img/icons/ingredients/fried-egg.svg'
                case INGREDIENT.EGG_MIRROR:
                    return '/img/icons/ingredients/fried-egg.svg'
                case DESSERT.CHOCOLATE:
                    return '/img/icons/ingredients/chocolate-bar.svg'
                case DESSERT.NUTELLA:
                    return '/img/icons/ingredients/nut.svg'
                case DESSERT.CARAMEL:
                    return '/img/icons/ingredients/crepe.svg'
                case DESSERT.SUGAR:
                    return '/img/icons/ingredients/sugar-cubes.svg'
                case DESSERT.CHESNUT:
                    return '/img/icons/ingredients/chestnut.svg'
                case DESSERT.JAM:
                    return '/img/icons/ingredients/jam.svg'
            }
            return
        },
    },
})
</script>

<style lang="scss" scoped>
img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.ingredient {
    margin-right: 8px;

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
}
</style>
