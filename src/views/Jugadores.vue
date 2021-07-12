<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-running fa-2x" titulo="JUGADORES" />
    <div class="col">
      <div class="row" v-if="!loading">
        <div class="col-3">
          <br />
        </div>
        <div class="col-6">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="8000"
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            class="row"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              v-for="(jugador, index) in jugadores"
              v-bind:key="index"
              :caption="jugador.nombre"
              :text="jugador.posicion"
              :img-src="jugador.rutaFoto"
            >
            </b-carousel-slide>
          </b-carousel>
        </div>
        <div class="col-3"><br /></div>
      </div>
      <div class="spinner" v-else>
        <b-spinner variant="primary" label="Cargando"></b-spinner>
      </div>
    </div>
  </div>
</template>


<script>
import HeaderSection from "../components/HeaderSection.vue";
import { jugadoresService } from "../js/services/jugadoresService.js";
export default {
  name: "Jugadores",
  components: {
    HeaderSection
  },
  data() {
    return {
      jugadores: {},
      loading: true
    };
  },
  mounted() {
    jugadoresService.getJugadores$(null).then(response => {
      this.jugadores = response.data;
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
.col-3 {

  margin-left: 0;
  margin-right: 0;
  
  background-position-y: top;
  background-position: top;
  background-repeat: no-repeat;
  background-color:#1890a3;
  background-position-y: 0cm;
}

.bg {
  background-image: url("../../public/medalla.png");
  background-position-y: top;
  background-position: top;
  background-repeat: no-repeat;

  background-position-y: 0cm;
}
</style>
