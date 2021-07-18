<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-camera-retro fa-2x" titulo="GALERIA" />
    <div v-if="!loading">
      <b-carousel
        id="carousel-galeria"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide v-for="image in fotos" :key="image.id" :img-src="image.ruta"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import { RestService } from "../js/services/RestService.js";
export default {
  name: "Galeria",
  components: {
    HeaderSection
  },
  data() {
    return {
      fotos: {},
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    RestService.getGaleria$(null).then(response => {
      this.fotos = response.data;
      this.loading = false;
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

</style>


<style>
.carousel-control-prev-icon, .carousel-control-next-icon {
  width: 100px !important;
  height: 100px !important;
}
</style>