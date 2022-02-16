<template>
  <div class="container-fluid">
    <HeaderSection icono="far fa-newspaper fa-2x" titulo="Web del Torneo" />
    <div class="embed-responsive embed-responsive-16by9">
      <iframe
        class="embed-responsive-item"
        src="https://www.torneosdonbosco.com.ar/35AEst.html"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import { contadorService } from "../js/services/contadorService.js";
export default {
  name: "Resultados",
  components: {
    HeaderSection
  },
  data() {
    return {
      response: null,
      error: null,
      contador: {}
    };
  },
  mounted() {
    contadorService
      .getContador$(null)
      .then(response => {
        this.contador = response.data[0];
        this.contador.torneo = Number(this.contador.torneo) + Number(1);
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

iframe {
  border: 0;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
