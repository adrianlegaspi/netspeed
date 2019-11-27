<template>
  <div id="app">
    <vue-particles color="#FFF5FC"
      clickMode="repulse"
    ></vue-particles>
    <main-bar/>
    <router-view/>
  </div>
</template>

<script>
import mainBar from "@/components/mainBar";

export default {
  name: 'mainApp',
  components:{
    mainBar
  },
  mounted(){
    this.$forceUpdate();
  }
}
</script>

<style>
  @font-face {
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 400;
  }

  html{
    height: 100%;
  }
  
  body {
      font-family: Ubuntu;
      background-color: #300A24!important;
      height: 100%;
      color: #FFF5FC;
  }

  .particles-js-canvas-el{
    position: absolute;
    height: 100%!important;
  }

</style>
