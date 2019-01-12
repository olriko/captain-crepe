import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Session from './views/Session.vue'
import Wrap from './views/Wrap.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/s/:session',
      name: 'session',
      component: Session,
    },
    {
      path: '/w/:session',
      name: 'wrap',
      component: Wrap,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
})
