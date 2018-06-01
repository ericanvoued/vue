<template>
  <div>
    <botton @click="increament" style="margin: 0 20px;">+</botton>
    <botton @click="decreament">-</botton>
    <p>{{number}}</p>
  </div>
</template>

<style>

</style>

<script>
  export default{
//      name:'counter',
    props:['number'],
    data(){
      return {
        number: 0
      }

    },
    methods: {
      increament(){
        this.$emit('incre')
      },
      decreament(){
        this.$emit('decre')
      },
    }
  }
</script>






