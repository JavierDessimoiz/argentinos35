<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-camera-retro fa-2x" titulo="SPONSORS" />
    <div class="container-fluid" v-if="!loading">
      <!--<vue-image-wall :link-images="fotos"></vue-image-wall>-->
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>
<script>
//import VueImageWall from '../components/image-wall/ImageWallWrapper.vue';
import HeaderSection from "../components/HeaderSection.vue";
import { RestService } from "../js/services/RestService.js";
export default {
  name: "Sponsors",
  components: {
    HeaderSection
  //  ,  VueImageWall 
  },
  data() {
    return {
      fotos: null,
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    RestService.getGaleria$(null).then(response => {
      this.fotos = response.data;
      this.loading = false;
      this.fotos = !response.data? [] : response.data.map(o => o.ruta);
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
