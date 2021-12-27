<template>
  <div class="container">
    <br>
    <div class="row-center">
        <h5 class="tituloFiltro">Filtrar por:</h5>
    </div>      
    <div class="row"> 
      <div class="col">
        <div class="col-filtro">
            <label>Torneo
            <div v-if="loadingTorneo" class="spinner-border" role="status" >
                <span class="sr-only"></span>
            </div>
            <div v-else class="row">
              <b-form-select name="Torneo" id="Torneo" v-model="torneoSeleccionado">
                  <b-form-select-option :value="null">
                       
                  </b-form-select-option>
                <b-form-select-option v-for="(torneo,index) in torneos" v-bind:value="torneo._id"  v-bind:key="index">
                  {{ torneo.Nombre }}
                </b-form-select-option>
              </b-form-select> 
            </div>  
          </label>
        </div>
      </div>

      <div class="col">
        <div class="col-filtro">
          <label>Rival   
              <div v-if="loadingRival" class="spinner-border" role="status" >
                  <span class="sr-only"></span>
              </div>
              <div v-else class="row">
                <b-form-select name="Rival" id="Rival" v-model="rivalSeleccionado">
                  <b-form-select-option :value="null">
                       
                  </b-form-select-option>
                  <b-form-select-option v-for="(rival,index) in rivales" v-bind:value="rival._id"  v-bind:key="index">
                        {{ rival.nombre }}
                  </b-form-select-option>
                </b-form-select>
              </div>   
          </label>
        </div>  
      </div> 

      <div class="col">
        <div class="col-filtro">
          <label>Goleador   
              <div v-if="loadingGoleador" class="spinner-border" role="status" >
                  <span class="sr-only"></span>
              </div>
              <div v-else class="row">
                <b-form-select name="Goleador" id="Goleador" v-model="goleadorSeleccionado">
                  <b-form-select-option :value="null">
                       
                  </b-form-select-option>
                  <b-form-select-option v-for="(goleador,index) in goleadores" v-bind:value="goleador._id"  v-bind:key="index">
                        {{ goleador.nombre }}
                  </b-form-select-option>
                </b-form-select>
              </div>   
          </label>
        </div> 
     </div> 
     
  </div>
  <div class="row-center-button" >
      <button type="button" class="btn btn-primary"  v-on:click="filtrarPartidos()">
              <i class="fas fa-search"></i>
            </button>
        </div>
</div>
</template>

<script>
import { torneosService } from "../js/services/torneosService.js";
import { rivalesService } from "../js/services/rivalesService.js";
import { jugadoresService } from "../js/services/jugadoresService.js";
export default {
  name: "FiltrosPartidos",
  props: {
    //torneoSeleccionado: String,
    //rivalSeleccionado: String,
    //goleadorSeleccionado: String,
  },
  data() {
    return {
        torneos: {},
        rivales: {},
        goleadores: {},
        torneoSeleccionado: null,
        rivalSeleccionado: null,
        goleadorSeleccionado: null,
        loadingRival: null,
        loadingTorneo: null,
        loadingGoleador: null
    };
  },

  mounted() {
    this.getTorneos();
    this.getRivales();
    this.getGoleadores();
  },
  methods: {
    getTorneos() {
      this.loadingTorneo = true;
      torneosService.getTorneos$(null).then(response => {
        this.loadingTorneo = false;
        this.torneos = response.data;
      });
    },
    getRivales() {
      this.loadingRival = true;
      rivalesService.getRivales$(null).then(response => {
        this.loadingRival = false;
        this.rivales = response.data;
      });
    },
    getGoleadores() {
      this.loadingGoleador = true;
      jugadoresService.getJugadores$(null).then(response => {
        this.loadingGoleador = false;
        this.goleadores = response.data;
      });
    },
    filtrarPartidos(){
      this.$emit("filtrarPartidos",this.torneoSeleccionado, this.rivalSeleccionado, this.goleadorSeleccionado);
    }
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
  background-color: #d4e6f1;
}

.col {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
  background-color: #ffffff;
}

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.row-center {
  background-color: #041f8a;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

}

.row-center-button {
  background-color: #ffffff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 1em;
}

.row-center-cab {
  background-color: #041f8a;
}
.h6 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.tituloFiltro {
  color: white;
  text-shadow: 2px 2px 4px #000000;
  margin-bottom: 0;
}
.col-filtro {
  margin-top: 1em;
  margin-left: 0.5em;
  --margin-rigth: 0.5em;
}
</style>
