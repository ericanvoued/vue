Eric, [Jul 2, 2018 at 9:09:46 PM]:
<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div>
    <nav-header></nav-header>
    <nav-bread><span slot="bread">Goods</span><span slot="pan">/Goods</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':currentPrice==='all'}" @click="changePrice('all')">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter" :key="index">
                <a href="javascript:void(0)" v-bind:class="{'cur':currentPrice===index}" @click="changePrice(index)">{{price.startPrice}}
                  - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(value,i) in goodList" :key="i">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'/static/'+value.picUrl" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{value.name}}</div>
                    <div class="price">{{value.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md-overlay" v-show="overlayFlag" @click="closePop()"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .nav-breadcrumb {
    text-align: left;
  }
</style>
<script>
  import "../assets/css/base.css";
  import "../assets/css/product.css";
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import NavBread from '@/components/Bread.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        currentPrice: 'all',
        filterBy:false,
        overlayFlag:false,
        goodList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          }, {
            startPrice: '500.00',
            endPrice: '1000.00'
          }, {
            startPrice: '1000.00',
            endPrice: '1500.00'
          }, {
            startPrice: '1500.00',
            endPrice: '2000.00'
          }, {
            startPrice: '2000.00',
            endPrice: '2500.00'
          }
        ]
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
    },
    mounted: function () {
      this.getGoodList();
    },
    methods: {
      getGoodList() {
        axios.get('/goods/good').then(data => {
          this.goodList = data.data.data;
          console.log(this.goodList[0].name)
        })
      },
      changePrice(index) {
        this.currentPrice = index;
        this.filterBy = false
        this.overlayFlag = false
      },
      showFilterPop(){
        this.filterBy = true
        this.overlayFlag = true
      },
      closePop(){
        this.filterBy = false
        this.overlayFlag = false
      }
    }
  }
</script>
