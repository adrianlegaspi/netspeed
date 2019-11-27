<template>
  <div class="home">
    <b-container fluid>
      <b-row class="p-3">
        <b-card bg-variant="info" class="w-100">
          <b-row>
            <b-col> 
              <p><i class="fas fa-hourglass-half" /> Ping: </p>
              <div class="text-center numbers"><b-spinner variant="dark" type="grow" label="Spinning" v-if="pingLoad" /> <div v-else> {{ ping }} </div></div>
            </b-col>
            <b-col :class="{'loadingText': downloadLoad }"> 
              <p><i class="fas fa-cloud-download-alt" /> Download speed: </p>
              <div class="text-center numbers"> <div> {{ download }} </div></div>
            </b-col>
            <b-col :class="{'loadingText': uploadLoad }"> 
              <p><i class="fas fa-cloud-upload-alt" /> Upload speed:</p>
              <div class="text-center numbers"> <div> {{ upload }} </div> </div>
            </b-col>
          </b-row>
        </b-card>
      </b-row>

      <b-row>
        <b-col>
          <b-tabs 
            content-class="mt-3">

            <b-tab  active>
              <template v-slot:title>
                <b-spinner type="grow" small v-if="pingLoad"></b-spinner> <i class='fas fa-hdd' v-else /> {{ (pingLoad ? 'Connecting to server' : 'Best server') }}
              </template>
              <b-card bg-variant="danger" img-alt="Image" img-top>
                <b-card-text v-if="!pingLoad">
                  Country: {{ bestServer.country }} <br/>
                  Sponsor: {{ bestServer.sponsor }}
                  URL: {{ bestServer.url }}
                </b-card-text>
                <b-card-text class="small">{{ bestServer.host }}</b-card-text>
              </b-card>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <b-spinner type="grow" small v-if="pingLoad"></b-spinner> <i class='fas fa-server' v-else /> {{ (pingLoad ? 'Connecting...' : 'Next best servers') }}
              </template>
              <b-row class="mt-2 mb-0" v-if="servers.length" >
                <b-col>
                  <b-table class="mb-0" :responsive="true" :dark="true" :items="servers"></b-table>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
          
        </b-col>
      </b-row>

      <b-row class="mt-2" v-if="!pingLoad">
        <b-col>
          <b-button variant="danger" @click="startTest" :disabled="disabledButton">
            <div v-if="!disabledButton">
              <i class="fas fa-redo-alt"></i> 
              <span> Test again</span>
            </div>
            <div v-else>
              <b-spinner small type="grow"></b-spinner>
              <span> Testing...</span>
            </div>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import speedTest from "speedtest-net";

export default {
  name: 'home',
  data(){
    return {
      offline: true,
      error: false,
      errorMessage: "",

      ping: "",
      download: "",
      upload: "",

      pingLoad: false,
      downloadLoad: false,
      uploadLoad: false,

      bestServer: [],
      servers: [],
      serversFields: [ "Country", "Sponsor", "Host", "Ping" ]
    }
  },
  computed:{
    disabledButton(){
      return this.pingLoad || this.downloadLoad || this.uploadLoad;
    }
  },
  mounted(){
    this.startTest();
  },
  methods: {
    startTest(){
      var main = this;
      var test = speedTest({maxTime: 5000});

      if (navigator.onLine) {
        console.log('online');
      } else {
        console.log('offline');
      }
      
      main.pingLoad = true;
      main.downloadLoad = true;
      main.uploadLoad = true;

      main.bestServer = [];
      main.servers = [];
      
      test.on('error', err => {
        console.error(err);
        main.pingLoad = false;
        main.downloadLoad = false;
        main.uploadLoad = false;
      });

      test.on('bestservers', servers => {
        
        var aux = servers.filter(server => {
          delete server["cc"];
          delete server["dist"];
          delete server["distMi"];
          delete server["id"];
          delete server["lat"];
          delete server["lon"];
          delete server["name"];
          delete server["url2"];

          server.bestPing = parseFloat(server.bestPing).toFixed(2);
          return server;
        });

        aux.splice(0,1);

        main.servers = aux;
        console.log('Closest servers: ', aux);
      });

      test.on('downloadspeedprogress', speed => {
        console.log(speed)
        main.download = ((speed * 125)/100).toFixed(2) +' Mbps';
      });

      test.on('downloadspeed', speed => {
        console.log(speed);
        main.downloadLoad = false;
        main.download = ((speed * 125)/100).toFixed(2) +' Mbps';
      });

      test.on('uploadspeedprogress', speed => {
        console.warn(speed)
        main.upload = ((speed * 125)/100).toFixed(2) + ' Mbps';
      });

      test.on('uploadspeed', speed => {
        console.log(speed);
        main.uploadLoad = false;
        main.upload = ((speed * 125)/100).toFixed(2) + ' Mbps';
      });

      test.on('testserver', server => {
        console.log('Test server:');
        console.dir(server);
        main.bestServer = server;
        main.pingLoad = false;
        main.ping = parseFloat(server.bestPing).toFixed(2) + " ms";
      });
    }
  }
}
</script>

<style>

  .home, .white-color{
    color: #FFF5FC;
  }

  .loadingText{
    color: #001e40;
  }

  .card-body h4{
    font-size: 1.1em;
  }

  .text-muted{
    color: #C2C2C2!important;
  }

  .nav-link, .numbers, .text-muted{
    font-weight: bolder!important;
  }

  .nav-link, .nav-link:hover{
    color: #FFF5FC;
  }

</style>