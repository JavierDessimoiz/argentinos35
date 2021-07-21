<template>
  <div class="container-fluid">
    <HeaderSection icono="far fa-play-circle fa-2x" titulo="VIDEOS" />
    <div v-if="!loading">
      <div data-aos="flip-down" v-for="video in videos" :key="video.id">
        <div class="row-title-center" style="background-color: #D4E6F1;">
          <strong>{{video.titulo}}</strong>
        </div>
        <b-embed :key="video.id" :src="video.ruta" type="iframe" aspect="16by9" allowfullscreen></b-embed>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import { RestService } from "../js/services/RestService.js";
import { contadorService } from "../js/services/contadorService.js";
export default {
  name: "Videos",
  components: {
    HeaderSection
  },
  data() {
    return {
      videos: {},
      loading: true,
      response: null,
      error: null,
      contador: {}
    };
  },
  mounted() {
    RestService.getVideo$(null).then(response => {
      this.videos = response.data;
      this.loading = false;
    });
    contadorService
      .getContador$(null)
      .then(response => {
        this.contador = response.data[0];
        this.contador.videos = Number(this.contador.videos) + Number(1);
        contadorService
          .updateContador$(this.contador._id, this.contador)
          .then(response => {
            this.response = response;
            this.error = null;
          })
          .catch(error => {
            this.loading = false;
            this.error = error;
          });
      })
      .catch(error => {
        this.error = error;
      });
  }
};
</script>


<style scoped>
.container-fluid {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
.row-title-center {
  color: #2d3279;
}
</style>
