import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import AOS from 'aos'
import 'aos/dist/aos.css'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init({
      easing: 'ease-out-back',
      duration: 1500,
      offset: 120,
      mirror: false ,
      anchorPlacement: 'top-bottom' ,
      })
  },

  router,
  render: h => h(App)
}).$mount('#app')


