import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import http from "./network/http"

import "./plugins/datefilters";


import '@/assets/css/me.css'
import "@/assets/css/semantic.min.css"
import "@/assets/css/typo.css"
import "@/assets/css/timeline.css"


Vue.config.productionTip = false

Vue.prototype.$http = http;

Vue.prototype.$imageUrl = "http://127.0.0.1:8080/chao/blog/image/";
Vue.prototype.$defaultPage = {
  pageNum: 1,
  pageSize: 5
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
