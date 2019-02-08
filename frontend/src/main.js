import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
VueCookies.config('1d')

Vue.config.productionTip = true


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

