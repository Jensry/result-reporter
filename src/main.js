import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Buefy from 'buefy'

Vue.config.productionTip = false;

Vue.use(VueFire)
Vue.use(Buefy)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
