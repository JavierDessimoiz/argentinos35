<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-futbol fa-2x" titulo="NOSOTROS" />
    <div class="row" style="background-color: #D4E6F1;">
      <h6 class="mt-2 mb-3" style="color: black;">
        Somos un equipo de fútbol 11 formado en su mayoría por amigos que
        compartieron la infancia en torneos de fútbol infantil. Actualmente
        participamos del Torneo Don Bosco Categoria mayores de 35 años.
      </h6>
    </div>
    <div v-if="!loading">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        :interval="3000"
      >
        <b-carousel-slide
          v-for="image in fotos"
          :key="image.id"
          :img-src="image.ruta"
        >
        </b-carousel-slide>
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
  name: "Presentacion",
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
    RestService.getPresentacion$(null).then(response => {
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

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
