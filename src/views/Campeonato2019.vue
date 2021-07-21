<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-trophy fa-2x" titulo="CAMPEONES 2019" />
    <div class="container-fluid" style="heigth: 1000px;" v-if="!loading">
      <b-carousel
        id="carousel-campeones"
        v-model="slide"
        :interval="10000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide v-for="(image, index) in fotos" :key="index" :img-src="image"></b-carousel-slide>
      </b-carousel>
      <div style="background-color: #CCCCCC;">
        <strong>Fuente: Revista Don Balon</strong>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import { contadorService } from "../js/services/contadorService.js";
export default {
  name: "Campeonato",
  components: {
    HeaderSection
  },
  data() {
    return {
      fotos: {},
      loading: true,
      response: null,
      error: null,
      contador:{}
    };
  },
  mounted() {
    this.loading = true;
    this.fotos = [
      "http://drive.google.com/uc?export=view&id=1HreZpRJ6W--vICZnbc9WNadMOfLMP3Lg",
      "http://drive.google.com/uc?export=view&id=13M23KL0MFnU85PAzrUmFLhmrxf3jAzco",
      "http://drive.google.com/uc?export=view&id=1MFk_7l-GhvP8oTtuZNwznZo2h5Y2QJjQ",
      "http://drive.google.com/uc?export=view&id=1GBbhb6i5ftgyF-le39zR0R5GrZ0I0t-x"
    ];
    contadorService
      .getContador$(null)
      .then(response => {
        this.contador = response.data[0];
        this.contador.campeones = Number(this.contador.campeones) + Number(1);
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
    this.loading = false;
  }
};
</script>


<style scoped>
.container-fluid {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
