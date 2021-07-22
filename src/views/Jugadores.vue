<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-running fa-2x" titulo="JUGADORES" />
    <div class="row row-centro" v-if="!loading">
      <div class="col-4">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="8000"
          controls
          indicators
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
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>


<script>
import HeaderSection from "../components/HeaderSection.vue";
import { jugadoresService } from "../js/services/jugadoresService.js";
import { contadorService } from "../js/services/contadorService.js";
export default {
  name: "Jugadores",
  components: {
    HeaderSection
  },
  data() {
    return {
      jugadores: {},
      loading: true,
      response: null,
      error: null,
      contador:{}
    };
  },
  mounted() {
    jugadoresService.getJugadores$(null).then(response => {
      this.jugadores = response.data;
      this.loading = false;
    });

    contadorService
      .getContador$(null)
      .then(response => {
        this.contador = response.data[0];
        this.contador.jugadores = Number(this.contador.jugadores) + Number(1);
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

<style>
.carousel-caption {
  padding-bottom: 0px !important;
  bottom: 10px !important;
}
</style>

<style scoped>
.container-fluid {
  padding: 0;
  margin-left: 0;
  background-image: url("http://drive.google.com/uc?export=view&id=1bBpFlrKWo4rQ3Xps-0yDZpfTaGNUDaJB");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.row-centro {
  justify-content: center;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>




