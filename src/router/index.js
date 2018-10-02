import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodList from '@/view/GoodList'
import CarList from '@/view/carList'
import Address from '@/view/address'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/GoodList',
      name: 'GoodList',
      component: GoodList
    },{
      path: '/carList',
      name: 'CarList',
      component: CarList
    }, {
      path: '/address',
      name: 'Address',
      component: Address
    }, {
      path: '/orderComfirm',
      name: 'OrderComfirm',
      component: OrderComfirm
    }
  ]
})
