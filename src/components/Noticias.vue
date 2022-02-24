<template>
  <div class="container-fluid">
    <br />
    <div v-if="loadingRefresh" class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>

    <div v-else>
      <div class="row-center ml-3 mr-3" data-aos="fade-up" v-for="(noticia, index) in noticias" v-bind:key="index">
        <div class="row-header-center-cab">
          <div class="row-header-center">
            <h2>
              Noticias
              <i class="fas fa-newspaper"></i>
            </h2>
          </div>
        </div>

        <div class="row-title-center">
          <h5>
            <u>{{ noticia.titulo }}</u>
          </h5>
        </div>
        <div class="row-title-center">
          <p>{{ noticia.cuerpo }}</p>
        </div>

        <div v-if= "noticia.foto != ''" class="row-title-center">
          <b-img :src=noticia.foto fluid alt="Noticia"></b-img>
        </div>
        
        <div v-if= "noticia.link != ''" class="row-title-center">
          <h4><a title= "Mas info" rel="stylesheet" :href= noticia.link crossorigin="anonymous"> Ver más... </a></h4>
        </div>

        <div class="row" v-if="usuarioLogueado == true">
          <div class="row mt-2 mb-2 ml-2">
            <b-button
              variant="outline-success"
              v-on:click="muestraModalAgregarEditarNoticia(noticias[0])"
            >
              <b-icon icon="pencil-fill"></b-icon>
            </b-button>
            <b-button
              variant="outline-danger"
              v-on:click="muestraModalEliminarNoticia(noticias[0])"
              class="ml-2"
            >
              <b-icon icon="trash-fill"></b-icon>
            </b-button>
            <b-button
              variant="outline-primary"
              v-on:click="muestraModalAgregarEditarNoticia(null)"
              class="ml-2"
            >
              <b-icon icon="plus-circle-fill"></b-icon>
            </b-button>
          </div>
        </div>
         <div class="row-header-center-cab">
            <div class="row-center-button">
              <br />
            </div>
          </div>
      </div>
    </div>
    <br />
    <b-modal ref="modalEliminarNoticia" title="Eliminar noticia" @ok="deleteNoticia()" centered>
      <span>¿Está seguro que desea eliminar la noticia?</span>
    </b-modal>

    <b-modal ref="modalAgregarEditarNoticia" title="Agregar Noticia" hide-footer centered>
      <form @submit.prevent="submit">
        <div class="row">
          <div class="row">
            <div class="row mb-2">
              <label>Fecha</label>
              <input
                v-if="!modoEditar"
                type="date"
                class="form-control form-control-sm"
                v-model="nuevaNoticia.fecha"
                required
              />
              <div v-else class="form-control form-control-sm">{{ nuevaNoticia.fecha }}</div>
            </div>
            <div class="row mb-2">
              <label>Titulo de la noticia</label>
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Nombre del torneo"
                v-model="nuevaNoticia.titulo"
                required
              />
            </div>
            <div class="row mb-2">
              <label>Cuerpo de la noticia</label>
              <textarea
                class="form-control form-control-sm"
                name="Text1"
                cols="40"
                rows="5"
                v-model="nuevaNoticia.cuerpo"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div v-if="!modoEditar" class="d-flex justify-content-center">
          <button v-if="!loading" type="submit" class="btn btn-success mt-3 mb-2">Agregar noticia</button>
          <b-button v-else class="btn btn-success mt-3 mb-2">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </b-button>
        </div>
        <div v-else class="d-flex justify-content-center">
          <button v-if="!loading" type="submit" class="btn btn-success mt-3 mb-2">Editar noticia</button>
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
import { noticiasService } from "../js/services/noticiasService.js";
import moment from "moment";
export default {
  name: "Noticias",
  props: {
    usuarioLogueado: Boolean,
    usuario: String
  },
  data() {
    return {
      loading: false,
      loadingRefresh: false,
      error: null,
      noticias: {},
      noticiaSeleccionada: null,
      nuevaNoticia: {},
      modoEditar: false
    };
  },
  computed: {
    fechaFormateada(fechaP) {
      return moment(String(fechaP)).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.getUltimaNoticia();
  },
  methods: {
    getUltimaNoticia() {
      this.loadingRefresh = true;
      noticiasService
        .getUltimaNoticia$(null)
        .then(response => {
          this.loadingRefresh = false;
          this.noticias = response.data;
        })
        .catch(error => {
          this.loadingRefresh = false;
          this.error = error;
        });
      this.initNoticia();
    },
    muestraModalEliminarNoticia(noticia) {
      this.noticiaSeleccionada = noticia;
      this.$refs.modalEliminarNoticia.show();
    },
    deleteNoticia() {
      this.loadingRefresh = true;
      noticiasService
        .deleteNoticia(this.noticiaSeleccionada._id)
        .then(response => {
          this.response = response;
          this.getUltimaNoticia();
          this.error = null;
        })
        .catch(error => {
          this.loadingRefresh = false;
          this.error = error;
        });
    },
    initNoticia() {
      this.nuevaNoticia.fecha = null;
      this.nuevaNoticia.titulo = null;
      this.nuevaNoticia.cuerpo = null;
      this.nuevaNoticia._id = null;
      this.nuevaNoticia.usuario = null;
      this.nuevaNoticia.foto = null;
      this.nuevaNoticia.link = null;
    },
    muestraModalAgregarEditarNoticia(noticia) {
      if (noticia == null) {
        this.modoEditar = false;
        this.initNoticia();
      } else {
        this.modoEditar = true;
        this.noticiaSeleccionada = noticia;
        this.nuevaNoticia = Object.assign({}, noticia);
      }
      this.error = null;
      this.$refs.modalAgregarEditarNoticia.show();
    },
    submit() {
      this.nuevaNoticia.usuario = this.usuario;
      if (this.modoEditar == true) {
        this.editarNoticia();
      } else {
        this.agregaNuevaNoticia();
      }
    },
    agregaNuevaNoticia() {
      this.loading = true;
      noticiasService
        .postNoticia$(this.nuevaNoticia)
        .then(response => {
          this.response = response;
          this.loading = false;
          this.getUltimaNoticia();
          this.error = null;
          this.$refs.modalAgregarEditarNoticia.hide();
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    },
    editarNoticia() {
      noticiasService
        .updateNoticia(this.nuevaNoticia._id, this.nuevaNoticia)
        .then(response => {
          this.response = response;
          this.loading = false;
          this.error = null;
          this.getUltimaNoticia();
          this.$refs.modalAgregarEditarNoticia.hide();
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
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: #d4e6f1;
}

.col {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
  background-color: rgb(212, 230, 241);
  background-color: #d4e6f1;
}

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.row-header-center {
  background-color: #041f8a;
  color: white;
  text-shadow: 2px 2px 4px #000000;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.row-title-center {
  color: #041f8a;
  margin-left: 1rem;
  margin-right: 1rem;
  border-bottom-left-radius: 30px;
}

.h6 {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.col-center {
  background-color: #e9eef1;
  margin-left: 0rem;
  margin-right: 0rem;
}

.row-center {
  background-color: #ffffff;
}

.row-header-center-cab {
  background-color: #d4e6f1;
}

.row-center-button {
  background-color: #FFFFFF;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

</style>
