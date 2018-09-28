<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .navbar{
    height: 83px;
  }
  .navbar-link.navbar-cart-link{
    height: 75px;
  }
  .navbar-link.navbar-cart-link .navbar-cart-logo{
    height: 29px;
    width: 50px;
  }
.navbar-left-container{
  float: left;
}

  .navbar-right-container{
    float: right;
    height: 100%;
  }

.navbar-menu-container{
  display: flex;
  align-content: center;
  justify-content: flex-end;
  height: 100%;
  line-height: 83px;
}

</style>
