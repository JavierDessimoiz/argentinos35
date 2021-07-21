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
      <div class="row-header">
        <video class="container-fluid" autoplay muted loop>
          <source
            src="https://drive.google.com/uc?export=download&id=1LJZZqDdbN3AD9sxeM5vUoajtxbEYt2Y4"
            type="video/webm"
          />
        </video>

        <image-wall-wrapper v-bind:link-images="this.fotos" :config="this.config"></image-wall-wrapper>
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
import ImageWallWrapper from "../components/image-wall/ImageWallWrapper.vue";
export default {
  name: "Presentacion",
  components: {
    HeaderSection,
    ImageWallWrapper
  },
  data() {
    return {
      fotos: null,
      loading: true,
      config: {
        general: {
          // corner radius
          radius: 0,
          // height of wrapper component
          height: 500,
          // degree of skew for images
          degreeSkew: 18,
          border: {
            thickness: 1.5,
            color: "#FFFFFF"
          }
        },
        /**
         * TODO: Mode a: apple macOS docker style
         * Mode b: Image current cursor hovering over enlarges, other images shrinks
         */
        mode: "b",
        // For mode B
        b: {
          // How much bigger will the hovering image be than others
          scale: 2.3,
          // duration of transition animation
          duration: 450
        }
      },
      contador: {},
      response: null,
      error: null
    };
  },
  mounted() {
    this.loading = true;
    RestService.getPresentacion$(null).then(response => {
      this.fotos = response.data;
      this.loading = false;
      this.fotos = !response.data ? [] : response.data.map(o => o.ruta);
    }),
      contadorService
        .getContador$(null)
        .then(response => {
          this.contador = response.data[0];
          this.contador.principal = Number(this.contador.principal) + Number(1);
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

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.row-header {
  background-color: #d4e6f1;
}
</style>

