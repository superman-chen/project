import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem.js'
import './assets/css/reset.css'
import './assets/css/common.css'
// import '../public/font_s9sfwwaciis/iconfont.css'
import '../public/font_s9sfwwaciis/iconfont.js'






// import './assets/css/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')