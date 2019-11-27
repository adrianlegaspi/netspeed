/*
  App developed by Adrian Legaspi under MIT License
  Support me on patreon: https://www.patreon.com/luyou
  Or you can only follow me on any of my socials ♥:
  Ins: https://www.instagram.com/adrian.luball/
  Tw: https://twitter.com/Imluyou
  Fb: https://www.facebook.com/ImLuyou/
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueParticles from 'vue-particles'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueParticles)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
