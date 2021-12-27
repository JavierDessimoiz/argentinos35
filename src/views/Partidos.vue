<template>
  <div class="container-fluid">
    <h2 class="row-header-center"> Resultados </h2>
    <FiltrosPartidos v-on:filtrarPartidos="filtrarPartidos" />
    <br />
    <div v-if="loadingRefresh" class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>

    <div v-else >
      <div v-if= "partidos.length > 0" class="row">
        <div
          v-for="(partido, index) in partidos"
          v-bind:key="index"
          class="col-sm-1 col-md-6 col-lg-6 col-xl-6 mb-4"
          data-aos="zoom-in"
          data-aos-delay="0"
          data-aos-offset="0"
        >
          <div class="col-ficha">
            <div class="row-center">
              <div class="row-center-cab">
                <div class="row-center">
                  <i class="fas fa-thumbtack"></i>
                </div>
              </div>
              <div class="row-center">
                <h3></h3>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col text-right">
                <strong>ARGENTINOS</strong>
              </div>
              <div class="col">
                <strong v-if="partido.finalizado">
                  {{ partido.golesArgentinos }} -
                  {{ partido.golesRival }}
                </strong>
                <strong v-else>- -</strong>
              </div>
              <div class="col text-left">{{ partido.Rival[0]["nombre"] }}</div>
            </div>
            <div class="row">
              <i class="far fa-calendar-alt mr-2 ml-2"></i>
              <u>Fecha</u>
              :
              {{ new Date(partido.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>

            <div class="row">
              <i class="fas fa-trophy mr-2 ml-1"></i>
              <u>Torneo</u>
              :
              {{ partido.torneo[0].Nombre }}
            </div>

            <div v-if="partido.nroFechaCampeonato > 0" class="row">
              <i class="fas fa-list-ol mr-2 ml-2"></i>
              <u>Fecha Nº</u>
              :
              {{ partido.nroFechaCampeonato }}
            </div>

            <div class="row">
              <i class="fas fa-map-pin mr-2 ml-2"></i>
              <u  class="ml-1">Sede: </u>
              <p class= "ficha" v-if=" partido.sede.length > 0 ">
              {{ partido.sede[0].nombre }}
              </p>
              <p class= "ficha" v-else > - </p>
            </div>
            
            <div class="row">
              <i class="fas fa-map-marker-alt mr-2 ml-2"></i>
              <u>Dirección:</u>
              <p class= "ficha" v-if=" partido.sede.length > 0 ">
              {{ partido.sede[0].direccion }}
              </p>
              <p class= "ficha" v-else > - </p>
            </div>

            <div class="row">
              <i class="far fa-clock mr-2 ml-2"></i>
              <u>Horario</u>
              :
              {{ partido.hora }}
            </div>

            <div class="row">
              <i class="fas fa-futbol fa-1x mr-2 ml-2"></i>
              <u>Goles:</u>
              
              <ul class="list-group"> 
                <div class="list-unstyled" v-for="(gol, index) in partido.goles" v-bind:key="index">
                  <li class="list ml-2">
                    - {{ index + 1}} {{ gol['jugador'][0]['nombre'] }}
                  </li>
                </div>
              </ul> 
              
            </div>

            <div v-if="usuarioLogueado == true">
              <div class="row mt-2 mb-2 ml-2">
                <b-button
                  variant="outline-success"
                  v-on:click="muestraModalAgregarEditarEliminarPartido(partido)"
                >
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  variant="outline-danger"
                  v-on:click="muestraModalEliminarPartido(partido)"
                  class="ml-2"
                >
                  <b-icon icon="trash-fill"></b-icon>
                </b-button>
                <b-button
                  variant="outline-primary"
                  v-on:click="muestraModalAgregarEditarEliminarPartido(null)"
                  class="ml-2"
                >
                  <b-icon icon="plus-circle-fill"></b-icon>
                </b-button>
              </div>
            </div>
            <div class="row-center-cab">
              <div class="row-center-button">
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>  
      <div v-else-if = "realizoBusqueda" class="col-ficha">
            <div class="alert alert-warning" role="alert">
              La búsqueda no arrojó resultados.
            </div>  
      </div>  
    </div>

    <b-modal ref="modalEliminarPartido" title="Eliminar Partido" @ok="deletePartido()" centered>
      <span>¿Está seguro que desea eliminar el partido?</span>
    </b-modal>

    <b-modal ref="modalAgregarEditarEliminarPartido" title="Agregar partido" hide-footer centered>
      <form @submit.prevent="submit">
        <div class="row">
          <div class="row">
            <div class="col-9">
              <label>Torneo</label>
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Nombre del torneo"
                v-model="nuevoPartido.nombreTorneo"
                required
              />
            </div>
            <div class="col-3">
              <label>Nro</label>
              <input
                type="number"
                min="0"
                max="15"
                class="form-control form-control-sm"
                v-model="nuevoPartido.nroFechaCampeonato"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <label>Fecha</label>
            <input
              v-if="!modoEditar"
              type="datetime-local"
              class="form-control form-control-sm"
              v-model="nuevoPartido.fecha"
              required
            />
            <div
              v-else
            >{{ new Date(nuevoPartido.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
          </div>

          <div class="col-6">
            <label>Predio</label>
            <b-form-select v-model="nuevoPartido.sede" :options="sedesOption"></b-form-select>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <label>Nombre del rival</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="nuevoPartido.nombreEquipoRival"
              required
            />
          </div>
        </div>
        <div class="col-12">
          <label>Rival</label>
          <b-form-select v-model="nuevoPartido.nombreEquipoRival" :options="rivalOption"></b-form-select>
        </div>
        <div class="row">
          <div class="col-5">
            <label>Goles de Argentinos</label>
            <input
              type="number"
              min="0"
              max="15"
              class="form-control form-control-sm"
              v-model="nuevoPartido.golesArgentinos"
            />
          </div>

          <div class="col-5">
            <label>Goles del rival</label>
            <input
              type="number"
              min="0"
              max="15"
              class="form-control form-control-sm"
              v-model="nuevoPartido.golesRival"
            />
          </div>

          <div class="col-2">
            <label>Final?</label>
            <input
              type="checkbox"
              class="form-control form-control-sm"
              v-model="nuevoPartido.finalizado"
            />
          </div>
          <div class="row">
            <div class="col-12">
              <label>Autores de los goles</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="nuevoPartido.autoresGoles"
              />
            </div>
          </div>

          <b-button
            variant="outline-primary"
            v-on:click="muestraModalAgregarEditarEliminarPartido(null)"
            class="ml-2"
          >
            <b-icon icon="plus-circle-fill"></b-icon>
          </b-button>
        </div>
        <div v-if="!modoEditar" class="d-flex justify-content-center">
          <button v-if="!loading" type="submit" class="btn btn-success mt-3 mb-2">Agregar partido</button>
          <b-button v-else class="btn btn-success mt-3 mb-2">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </b-button>
        </div>
        <div v-else class="d-flex justify-content-center">
          <button v-if="!loading" type="submit" class="btn btn-success mt-3 mb-2">Editar partido</button>
          <b-button v-else class="btn btn-success mt-3 mb-2">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </b-button>
        </div>
        <div class="row">
          <b-alert v-if="error != null" show variant="danger">
            Ha ocurrido un error al grabar, por favor vuelva a
            intentar
          </b-alert>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { partidoService } from "../js/services/partidoService.js";
import FiltrosPartidos from "../components/FiltrosPartidos.vue";
import moment from "moment";
export default {
  name: "Partidos",
  components: { FiltrosPartidos },
  props: {
    usuarioLogueado: Boolean,
    usuario: String
  },
  data() {
    return {
      partidos: {},
      nuevoPartido: {},
      partidoSeleccionado: null,
      loading: false,
      loadingRefresh: false,
      error: null,
      modoEditar: false,
      response: null,
      sedes: null,
      //sedeSelected: null,
      sedesOption: [],
      rivalOption: [],
      rivales: null,

      torneoSeleccionado: "",
      rivalSeleccionado: "",
      goleadorSeleccionado: "",      
      realizoBusqueda: false,
    };
  },
  computed: {
    fechaFormateada(fechaP) {
      return moment(String(fechaP)).format("DD/MM/YYYY");
    },
  },

  methods: {
    getPartidos(torneoSeleccionado,rivalSeleccionado,goleadorSeleccionado) {
      this.loadingRefresh = true;
      partidoService.getPartidos$(torneoSeleccionado,rivalSeleccionado,goleadorSeleccionado).then(response => {
        this.partidos = response.data;

        if (goleadorSeleccionado != null)
                {this.partidos = this.partidos.filter(partido =>  partido.goles.find(goles => goles.jugador.find (jugador => jugador._id == goleadorSeleccionado)))}
        this.loadingRefresh = false;
        this.realizoBusqueda=true;
      });
 
    },
    muestraModalEliminarPartido(partido) {
      this.partidoSeleccionado = partido;
      this.$refs.modalEliminarPartido.show();
      //this.$refs.modalAgregarEditarEliminarPartido.show();
    },
    deletePartido() {
      this.loadingRefresh = true;
      partidoService
        .deletePartido(this.partidoSeleccionado._id)
        .then(response => {
          this.response = response;
          this.getPartidos();
          this.error = null;
        })
        .catch(error => {
          this.loadingRefresh = false;
          this.error = error;
        });
    },
    initPartido() {
      this.nuevoPartido.fecha = null;
      this.nuevoPartido.hora = "A confirmar";
      this.nuevoPartido.predio = "A confirmar";
      this.nuevoPartido.golesArgentinos = 0;
      this.nuevoPartido.golesRival = 0;
      this.nuevoPartido.finalizado = false;
      this.nuevoPartido.autoresGoles = "";
      this.nuevoPartido.nombreEquipoRival = "A confirmar";
      this.nuevoPartido.nroFechaCampeonato = 0;
      this.nuevoPartido.nombreTorneo = "Don Bosco";
      this.nuevoPartido.sede = null;
      this.nuevoPartido.goles = null;
      this.nuevoPartido._id = null;
    },
    muestraModalAgregarEditarEliminarPartido(partido) {
      //sedes
      partidoService.getSedes$().then(response => {
        this.sedes = response.data;
        this.sedesOption = this.sedes.map(el => ({
          text: el.nombre,
          value: el._id
        }));
        this.nuevoPartido.sede = this.nuevoPartido.sede[0]._id;
      });

      //rivales
      partidoService.getRivales$().then(response => {
        this.rivales = response.data;
        this.rivalOption = this.rivales.map(el => ({
          text: el.nombre,
          value: el._id
        }));
        this.nuevoPartido.nombreEquipoRival = this.nuevoPartido.nombreEquipoRival[0]._id;
      });

      if (partido == null) {
        this.modoEditar = false;
        this.initPartido();
      } else {
        this.modoEditar = true;
        this.partidoSeleccionado = partido;
        this.nuevoPartido = Object.assign({}, partido);
      }
      this.error = null;
      this.$refs.modalAgregarEditarEliminarPartido.show();
    },
    submit() {
      this.nuevoPartido.usuario = this.usuario;
      //this.nuevoPartido.sede = this.sedeSelected;
      if (this.modoEditar == true) {
        this.editarPartido();
      } else {
        this.agregaNuevoPartido();
      }
    },
    agregaNuevoPartido() {
      this.loading = true;
      partidoService
        .postPartido$(this.nuevoPartido)
        .then(response => {
          this.response = response;
          this.loading = false;
          this.getPartidos();
          this.error = null;
          this.$refs.modalAgregarEditarEliminarPartido.hide();
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    },
    editarPartido() {
      partidoService
        .updatePartido(this.nuevoPartido._id, this.nuevoPartido)
        .then(response => {
          this.response = response;
          this.loading = false;
          this.error = null;
          this.getPartidos();
          this.$refs.modalAgregarEditarEliminarPartido.hide();
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
      this.loading = true;
    },
    filtrarPartidos(torneoSeleccionado,rivalSeleccionado,goleadorSeleccionado){
      this.getPartidos(torneoSeleccionado,rivalSeleccionado,goleadorSeleccionado);
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
}

.col-ficha {
   background-color: #ffffff;
}

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.row-center {
  background-color: black;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.row-center-button {
  background-color: #ffffff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.row-center-cab {
  background-color: #d4e6f1;
}
.h6 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.list {
    text-align: start;
}

.ficha {
  margin-bottom: 0;
  margin-left: 5px;
}

.row-ficha {
  align-content: center;
}

.alert {
  margin-bottom: 0;
}

.row-header-center {
  background-color: #041f8a;
  color: white;
  text-shadow: 2px 2px 4px #000000;

}
</style>
