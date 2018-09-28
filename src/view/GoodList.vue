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
          <a href="javascript:void(0)" class="price" @click="sortGoods()">Price
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
                    <a href="#"><img v-bind:src="'/static/'+value.imgUrl" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{value.productName}}</div>
                    <div class="price">{{value.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click='addCar(value.productId)'>加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>

              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <img src="/static/loading-svg/loading-bubbles.svg" alt="" height="100" v-show="isLoading">
              </div>
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
        filterBy: false,
        overlayFlag: false,
        goodList: [],
        currentPage: 1,
        busy: true,
        isLoading: false,
        priceLevel: 'all',
        sortFlag: true,
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '1000.00'
          }, {
            startPrice: '1000.00',
            endPrice: '2000.00'
          }, {
            startPrice: '2000.00',
            endPrice: '3000.00'
          }, {
            startPrice: '3000.00',
            endPrice: '4000.00'
          }, {
            startPrice: '4000.00',
            endPrice: '5000.00'
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
      this.getGoodList(false);
    },
    methods: {
      getGoodList(flag) {
        this.isLoading = true;
        let param = {
          sort: this.sortFlag ? 1 : -1,
          page: this.currentPage,
          priceLevel: this.priceLevel
        }

        axios.get('/goods/good', {
          params: param
        }).then(data => {
          this.isLoading = false;
          if (flag) {
            this.goodList = this.goodList.concat(data.data.result.list);
            if (data.data.result.list.length == 0) {
              this.busy = true
            } else {
              this.busy = false;
            }
          }else {
            this.goodList = data.data.result.list;
            this.busy = false
          }
        })
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.currentPage = 1;
        this.getGoodList(false);
      },
      changePrice(index) {
        this.currentPrice = index;
        this.filterBy = false;
        this.overlayFlag = false;
        this.priceLevel = index;
        this.currentPage = 1;
        this.getGoodList(false)

      },
      showFilterPop() {
        this.filterBy = true
        this.overlayFlag = true
      },
      closePop() {
        this.filterBy = false
        this.overlayFlag = false
      },
      loadMore: function () {
        this.busy = true;
        setTimeout(() => {
          this.currentPage++;
          this.getGoodList(true);
        }, 500);
      },
      addCar(productId) {
        axios.post('/goods/addCart',{productId:productId}).then(data=>{
          if(data.data.status==2){
            alert(data.data.msg)
          }else {
            alert(data.data.msg)
          }
        })
      }
    }
  }
</script>
