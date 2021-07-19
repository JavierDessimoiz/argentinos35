<template>
  <div class="container-fluid">
    <br />
    <div v-if="loadingRefresh" class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
    <div v-else class="row">
      <div
        v-for="(partido, index) in partidos"
        v-bind:key="index"
        class="col-sm-1 col-md-6 col-xs-6 mt-2 mb-2"
      >
        <div class="col">
          <div class="row-center">
            <div class="row-center-cab">
              <div class="row-center">
                <i class="fas fa-thumbtack"></i>
              </div>
            </div>
            <div class="row-center">
              <h3 v-if="partido.finalizado && index == 0">Ultimo partido</h3>
              <h3 v-else-if="partido.finalizado && index == 1">Anterior partido</h3>
              <h3 v-else>Próximo partido</h3>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col text-right">
              <strong>Argentinos</strong>
            </div>
            <div class="col">
              <strong v-if="partido.finalizado">
                {{ partido.golesArgentinos }} -
                {{ partido.golesRival }}
              </strong>
              <strong v-else>- -</strong>
            </div>
            <div class="col text-left">{{ partido.nombreEquipoRival }}</div>
          </div>
          <div class="row">
            <i class="fas fa-map-pin mr-3 ml-2"></i>
            <u>Predio</u>
            :
            {{ partido.predio }}
          </div>
          <div class="row">
            <i class="fas fa-list-ol mr-2 ml-2"></i>
            <u>Fecha Nro</u>
            :
            {{ partido.nroFechaCampeonato }}
          </div>
          <div class="row">
            <i class="far fa-calendar-alt mr-2 ml-2"></i>
            <u>Fecha</u>
            :
            {{ new Date(partido.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>

          <div class="row">
            <i class="far fa-clock mr-2 ml-2"></i>
            <u>Horario</u>
            :
            {{ partido.hora }}
          </div>

          <div class="row" v-if="partido.autoresGoles.length > 0">
            <i class="fas fa-futbol fa-1x mr-2 ml-2"></i>
            <u>Goles</u>
            :
            {{ partido.autoresGoles }}
          </div>
          <div v-else>
            <br />
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
                class="form-control form-control-sm"
                v-model="nuevoPartido.nroFechaCampeonato"
                required
              />
            </div>
          </div>
          <div class="col-5">
            <label>Fecha</label>
            <input
              v-if="!modoEditar"
              type="date"
              class="form-control form-control-sm"
              v-model="nuevoPartido.fecha"
              required
            />
            <div
              v-else
            >{{ new Date(nuevoPartido.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
          </div>
          <div class="col-3">
            <label>Hora</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="nuevoPartido.hora"
              required
            />
          </div>
          <div class="col-4">
            <label>Predio</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="nuevoPartido.predio"
              required
            />
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
        <div class="row">
          <div class="col-5">
            <label>Goles de Argentinos</label>
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="nuevoPartido.golesArgentinos"
            />
          </div>
          <div class="col-5">
            <label>Goles del rival</label>
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="nuevoPartido.golesRival"
            />
          </div>

          <div class="col-2">
            <label>Finalizado</label>
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
import moment from "moment";
export default {
  name: "Partidos",
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
      response: null
    };
  },
  computed: {
    fechaFormateada(fechaP) {
      return moment(String(fechaP)).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.getUltimosDosPartidos();
  },
  methods: {
    getUltimosDosPartidos() {
      this.loadingRefresh = true;
      partidoService.getUltimosDosPartido$(null).then(response => {
        this.loadingRefresh = false;
        this.partidos = response.data;
      });
      this.initPartido();
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
          this.getUltimosDosPartidos();
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
      this.nuevoPartido._id = null;
    },
    muestraModalAgregarEditarEliminarPartido(partido) {
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
          this.getUltimosDosPartidos();
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
          this.getUltimosDosPartidos();
          this.$refs.modalAgregarEditarEliminarPartido.hide();
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
      this.loading = true;
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
}

.row-center-cab {
  background-color: #d4e6f1;
}
.h6 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
</style>
