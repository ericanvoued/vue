import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodList from '@/view/GoodList'
import CarList from '@/view/carList'
import Address from '@/view/address'
import OrderConfirm from '@/view/orderConfirm'
import OrderSuccess from '@/view/orderSuccess'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
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
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    }, {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
