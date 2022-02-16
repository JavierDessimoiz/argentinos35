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
        data-aos="zoom-in"
        data-aos-delay="0"
        data-aos-offset="0"
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
            <div class="col text-left">{{ partido.Rival[0].nombre }}</div>
          </div>
          <div class="row">
            <i class="fas fa-trophy mr-2 ml-1"></i>
            <u>Torneo</u>
            :
            {{ partido.torneo[0].Nombre }}
          </div>
          <div class="row">
            <i class="fas fa-map-pin mr-3 ml-2"></i>
            <u>Sede</u>
            :
            {{ partido['sede'][0].nombre }}
          </div>
          <div class="row">
            <i class="fas fa-map-marker-alt mr-2 ml-2"></i>
            <u>Dirección</u>
            :
            {{ partido['sede'][0].direccion }}
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

          <div class="row">
            <i class="fas fa-futbol fa-1x mr-2 ml-2"></i>
            <u>Goles:</u>
            <ul class="list-group">
              <div class="list-unstyled" v-for="(gol, index) in partido.goles" v-bind:key="index">
                <li class="list ml-2 text-left">- {{ index + 1}} {{ gol['jugador'][0]['nombre'] }}</li>
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

    <b-modal ref="modalEliminarPartido" title="Eliminar Partido" @ok="deletePartido()" centered>
      <span>¿Está seguro que desea eliminar el partido?</span>
    </b-modal>

    <b-modal
      ref="modalAgregarEditarEliminarPartido"
      title="Agregar/Editar partido"
      hide-footer
      centered
    >
      <form @submit.prevent="submit">
        <div class="row">
          <div class="row mb-2">
            <div class="col-4">
              <label>Organizador</label>
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Nombre del torneo"
                v-model="nuevoPartido.nombreTorneo"
                required
              />
            </div>
            <div class="col-8">
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
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label>Torneo</label>
              <b-form-select v-model="nuevoPartido.torneo" :options="torneoOption"></b-form-select>
            </div>
            <div class="col-6">
              <label>Predio</label>
              <b-form-select v-model="nuevoPartido.sede" :options="sedesOption"></b-form-select>
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-10">
            <label>Rival</label>
            <b-form-select v-model="nuevoPartido.Rival" :options="rivalOption"></b-form-select>
          </div>

          <div class="col-2">
            <label>Nro</label>
            <input
              type="number"
              min="0"
              max="25"
              class="form-control form-control-sm"
              v-model="nuevoPartido.nroFechaCampeonato"
              required
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-5">
            <label>Goles de Argentinos</label>
            <input
              type="number"
              min="0"
              max="25"
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

          <!--
          <b-button
            variant="outline-primary"
            v-on:click="muestraModalAgregarEditarEliminarPartido(null)"
            class="ml-2"
          >
            <b-icon icon="plus-circle-fill"></b-icon>
          </b-button>
          -->
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
          <!--<button v-if="!loading" type="submit" class="btn btn-success mt-3 mb-2">Editar partido</button>
          <b-button v-else class="btn btn-success mt-3 mb-2">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </b-button>-->
        </div>
        <div class="row">
          <b-alert v-if="error != null" show variant="danger">
            Ha ocurrido un error al grabar, por favor vuelva a
            intentar
          </b-alert>
        </div>
      </form>

      <u>Goles:</u>
      <ul class="list-group">
        <div class="list-unstyled" v-for="(gol, index) in golesPartido" v-bind:key="index">
          <div class="row mb-1">
            <div class="col">
              <li class="list ml-2 text-left">- {{ index + 1 }} {{ gol['jugador'][0]['nombre'] }}</li>
            </div>
            <div class="col">
              <button @click="borrarGol(index)" class="btn btn-danger btn-sm">Borrar</button>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <label class="col-3">Agregar gol</label>
          <div class="col-8">
            <b-form-select v-model="idJugadorSeleccionado" :options="jugadoresOption"></b-form-select>
          </div>
          <div class="col-1">
            <button
              @click="agregarGoleador(idJugadorSeleccionado, nuevoPartido._id)"
              class="btn btn-primary btn-sm"
            >+</button>
          </div>
        </div>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import { partidoService } from "../js/services/partidoService.js";
import { jugadoresService } from "../js/services/jugadoresService.js";
import { partidoGolesService } from "../js/services/partidoGolesService.js";
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
      response: null,
      sedes: null,
      //sedeSelected: null,
      sedesOption: [],
      rivalOption: [],
      torneoOption: [],
      torneos: null,
      rivales: null,
      jugadoresOption: [],
      jugadores: null,
      idJugadorSeleccionado: null,
      golesPartido: []
    };
  },
  computed: {
    fechaFormateada(fechaP) {
      return moment(String(fechaP)).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.getUltimosDosPartidos();
    this.getJugadores();
  },
  methods: {
    getUltimosDosPartidos() {
      this.loadingRefresh = true;
      partidoService.getUltimosDosPartido$(null).then(response => {
        this.loadingRefresh = false;
        this.partidos = response.data;
        console.log(this.partidos);
      });
    },
    getJugadores() {
      jugadoresService.getJugadores$(null).then(response => {
        this.jugadores = response.data;
        this.jugadoresOption = this.jugadores.map(el => ({
          text: el.nombre,
          value: el._id
        }));
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
      this.nuevoPartido.nroFechaCampeonato = 0;
      this.nuevoPartido.golesArgentinos = 0;
      this.nuevoPartido.golesRival = 0;
      this.nuevoPartido.finalizado = false;
      this.nuevoPartido.sede = [];
      this.nuevoPartido.Rival = [];
      this.nuevoPartido.torneo = [];
      this.nuevoPartido.goles = [];
      this.nuevoPartido.nombreTorneo = "Don Bosco";
      this.nuevoPartido._id = null;
      this.golesPartido = [];
      this.nuevoPartido.autoresGoles = null;
      this.nuevoPartido.nombreEquipoRival = null;
    },
    muestraModalAgregarEditarEliminarPartido(partido) {
      //sedes
      partidoService.getSedes$().then(response => {
        this.sedes = response.data;
        this.sedesOption = this.sedes.map(el => ({
          text: el.nombre,
          value: el._id
        }));
        //this.nuevoPartido.sede = this.nuevoPartido.sede[0]._id;
      });

      //rivales
      partidoService.getRivales$().then(response => {
        this.rivales = response.data;
        this.rivalOption = this.rivales.map(el => ({
          text: el.nombre,
          value: el._id
        }));
      });

      //Torneo
      partidoService.getTorneos$().then(response => {
        this.torneos = response.data;
        this.torneoOption = this.torneos.map(el => ({
          text: el.Nombre,
          value: el._id
        }));
      });

      if (partido == null) {
        this.modoEditar = false;
        this.initPartido();
      } else {
        this.modoEditar = true;
        this.partidoSeleccionado = partido;
        this.nuevoPartido = Object.assign({}, partido);
        this.golesPartido = Object.assign([], partido.goles);
        this.nuevoPartido.sede = this.nuevoPartido.sede[0]._id;
        this.nuevoPartido.Rival = this.nuevoPartido.Rival[0]._id;
        this.nuevoPartido.torneo = this.nuevoPartido.torneo[0]._id;
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
      //this.golesPartido = [];
    },
    agregaNuevoPartido() {
      this.loading = true;
      partidoService
        .postPartido$(this.nuevoPartido)
        .then(response => {
          this.response = response.data;
          this.error = null;
          //let cargoGoles = false;
          this.golesPartido
            .forEach(
              gol => (
                (gol._parent_id = this.response._id),
                partidoGolesService
                  .postPartidoGoles$(gol)
                  .then(response => {
                    this.response = response;
                  })
                  .catch(error => {
                    this.loading = false;
                    this.error = error;
                  })
              )
            )
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

    deleteGolPartido(id) {
      partidoGolesService
        .deleteGolPartidoid(id)
        .then(response => {
          this.response = response;
          this.error = null;
        })
        .catch(error => {
          this.error = error;
        });
    },

    editarPartido() {
      this.loading = true;
      partidoService
        .updatePartido(this.nuevoPartido._id, this.nuevoPartido)
        .then(response => {
          this.response = response;
          this.loading = false;
          this.error = null;
          //elimina todos los goles relacionados con el partido y luego los actualiza

          this.partidoSeleccionado.goles.forEach(gol =>
            this.deleteGolPartido(gol._id)
          );

          //Agrego los goles
          this.golesPartido.forEach(
            gol => (
              (gol._parent_id = this.nuevoPartido._id),
              partidoGolesService
                .postPartidoGoles$(gol)
                .then(response => {
                  this.response = response;
                })
                .catch(error => {
                  this.loading = false;
                  this.error = error;
                })
            )
          );

          this.error = null;
          this.loading = false;
          this.getUltimosDosPartidos();
          this.$refs.modalAgregarEditarEliminarPartido.hide();
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    },
    borrarGol(index) {
      this.golesPartido.splice(index, 1);
    },
    agregarGoleador(idJugadorSeleccionado, _parent_id) {
      let goleador = this.jugadores.find(
        jugador => jugador._id == idJugadorSeleccionado
      );
      let nuevoGol = {
        jugador: [],
        minutos: 0,
        _parent_id: null,
        _parent_def: "partidos",
        _parent_field: "goles"
      };
      nuevoGol._parent_id = _parent_id;
      nuevoGol.jugador.push(goleador);
      this.golesPartido.push(nuevoGol);
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
