<template>
    <div class="menu" v-if="user">
        <div class="picture">
            <img :src="user.photoURL">
        </div>
        <div class="content">
            <p class="name">{{ user.displayName }}</p>
            <div class="tags">
                <span :key="ingredient" v-for="ingredient in menu.ingredients" :class="ingredient === 'egg' && menu.mirror ? 'tag is-warning' :  'tag is-info'">{{ ingredient }}</span>
                <span v-if="menu.dessert" class="tag is-danger">{{ menu.dessert === 'salted butter caramel' ? 'sbl' :  menu.dessert }}</span>
            </div> 
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Menu } from '@/types/menu'
import { getUser } from '../services/auth'
import { User } from '@/types/user'

export default Vue.extend({
    data: () => ({
        user: undefined as User | undefined,
    }),
    props: {
        menu: Object,
        userId: String,
    },
    async created() {
        this.user = await getUser(this.userId)
    },
})
</script>

<style lang="scss" scoped>
    .menu {
        background-color: white;
        border-radius: $radius;
        width: 100%;
        height: 60px;
        margin-bottom: 1rem;
        white-space: nowrap;

        .picture {
            width: 60px;
            height: 60px;
            display: inline-block;
            img {
                border-radius: $radius 0 0 $radius;
            }
        }
        .content {
            display: inline-block;
            vertical-align: top;
            padding: 5px;

            .name {
                margin-bottom: 0px;
                font-weight: 500;
            }
        }
    }
</style>
