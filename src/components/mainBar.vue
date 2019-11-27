<template>
  <div class="hello">
    <b-container fluid class="main-container">
      <b-row class="pr-2 pt-2 tab-row">
        <b-col cols=10 class="drag-bar h-100">
          <span class="header-title mx-auto">NetSpeed</span>
        </b-col>
        <b-col cols=1 class="text-right">
          <button class="bar-button action-button" @click="minimizeWindow"><i class="fas fa-minus"></i></button>
        </b-col>
        <b-col cols=1 class="text-right">
          <button class="bar-button action-button" @click="closeWindow"><i class="fas fa-times"></i></button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { remote } from "electron";

export default {
  name: 'main-bar',
  data(){
    return {

    }
  },
  mounted(){
  },
  methods: {
    closeWindow(){
      remote.getCurrentWindow().close();
    },
    minimizeWindow(){
      remote.getCurrentWindow().minimize();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 3C3B37-->
<style scoped>
  .drag-bar{
    -webkit-app-region: drag;
  }

  .header-title{
    color: #FFF5FC;
    font-weight: 500;
  }

  .action-button{
    background-color: transparent;
    color: #FFF5FC;
    border: none;
  }

  .action-button:hover{
    box-shadow:inset 0 0 0 9999px rgba(0,0,0,0.3);
    border-radius: 5px;
  }
</style>
