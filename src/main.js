// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'


Vue.config.productionTip = false

// Vue.use(VueLazyload, {
//   loading: '/static/loading-svg/loading-balls.svg'
// })


Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
