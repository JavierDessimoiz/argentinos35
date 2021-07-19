<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-running fa-2x" titulo="JUGADORES" />
      <div class="row row-centro" v-if="!loading">
        <div class="col-3">
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
  background-image: url("http://drive.google.com/uc?export=view&id=1bBpFlrKWo4rQ3Xps-0yDZpfTaGNUDaJB");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.row-centro{
  justify-content: center;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>

<style>
.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 100px !important;
  height: 100px !important;
}

.carousel-caption {
  padding-bottom: 0px !important;
}

</style>

