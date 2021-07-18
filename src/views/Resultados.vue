<template>
  <div class="container-fluid">
    <HeaderSection icono="far fa-newspaper fa-2x" titulo="Web del Torneo" />
    <div class="embed-responsive embed-responsive-16by9">
      <iframe
        class="embed-responsive-item"
        src="https://www.torneosdonbosco.com.ar/"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";

export default {
  name: "Resultados",
  components: {
    HeaderSection
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
