import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueClipboard)

Vue.filter('time', (value: Date) => {
  return `${value.getHours()}:${value.getMinutes()}`
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
