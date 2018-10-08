// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'

// import currency from './util/currency'

Vue.config.productionTip = false

// Vue.use(VueLazyload, {
//   loading: '/static/loading-svg/loading-balls.svg'
// })
// Vue.filter('currency',currency)

Vue.use(infiniteScroll)
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    nickName:'',
    carCount:0,
  },
  mutations:{
    updataUserInfo(state, nickName){
      state.nickName = nickName;
    },
    updateCarCount(state, carCount){
      state.carCount += carCount
    },
    clearCarCount(state){
      state.carCount = 0
    },
    initCarCount(state, carCount){
      state.carCount = carCount
    }
  }
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
