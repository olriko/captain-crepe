<template>
    <div v-if="session">
        <div class="head">
            <h5 class="title is-5">
                Orders
                <div class="tags has-addons">
                    <span class="tag is-dark">{{ Object.keys(session.menus || {}).length }}</span>
                    <span class="tag is-info">{{ Object.keys(session.menus || {}).length * 8 }} €</span>
                </div>
            </h5>
        </div>
        <menu-item :session-id="session.id" v-if="Object.keys(session.menus || {}).length > 0" v-for="(menu, userId) in session.menus" :key="userId" :userId="userId" :menu="menu"/>
        <div v-if="!Object.keys(session.menus || {}).length" class="box has-text-centered">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Menus.lenght === 0</p>
        </div>
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
})
</script>

<style lang="scss" scoped>
    .head {
        margin-bottom: 1rem;
        .title .tags.has-addons {
            float: right;
        }
    }
    .box {
        margin-bottom: 1rem;
        i {
            font-size: 6rem;
            color: $primary;
        }
        p {
            margin-top: 10px;
            font-weight: 600;
        }
    }
</style>
