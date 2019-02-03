<template>
    <div class="menu" v-if="user">
        <button 
        v-if="currentUser && (user.uid === currentUser.uid || currentUser.admin)" 
        class="remove button is-rounded is-small is-danger"
        @click="remove()"
        >
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
        </button>
        <div class="picture">
            <img :src="user.photoURL">
        </div>
        <div class="content">
            <p class="name">{{ user.displayName }}</p>
            <div class="tags">
                <span :key="ingredient" v-for="ingredient in menu.ingredients" :class="ingredient === 'egg' && menu.mirror ? 'tag is-warning' :  'tag is-info'">{{ ingredient }}</span>
                <span v-if="menu.dessert && menu.dessert !== 'jam'" class="tag is-danger">{{ menu.dessert === 'salted butter caramel' ? 'sbl' :  menu.dessert }}</span>
                 <span v-if="menu.dessert && menu.dessert === 'jam'" class="tags has-addons jam">
                    <span class="tag is-danger">{{ menu.dessert }}</span>
                    <span v-if="menu.flavor" class="tag is-link">{{ menu.flavor }}</span>
                 </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Menu } from '@/types/menu'
import { getUser } from '../services/auth'
import { User } from '@/types/user'
import { currentUser } from "@/observables/user"
import { removeMenu } from "@/services/menu"

export default Vue.extend({
    data: () => ({
        user: undefined as User | undefined,
        currentUser: undefined as User | undefined,
    }),
    props: {
        menu: Object,
        userId: String,
        sessionId: String,
    },
    async created() {
        this.user = await getUser(this.userId)
        currentUser.subscribe((user) => {
            this.currentUser = user
        })
    },
    methods: {
        remove() {
            if (this.user)
                removeMenu(this.sessionId, this.user)
        }
    }
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
        position: relative;

        .remove {
            position: absolute;
            right: -8px;
            top: -5px;
        }

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

            .tags {
                white-space: nowrap;
                &.jam {
                    margin-bottom: 1px;
                }
            }
            .name {
                margin-bottom: 0px;
                font-weight: 500;
            }
        }
    }
</style>
