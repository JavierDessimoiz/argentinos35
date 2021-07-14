<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-camera-retro fa-2x" titulo="SPONSORS" />
    <div class="container-fluid" v-if="!loading">
      <image-wall-wrapper v-bind:link-images="this.fotos" :config="this.config"></image-wall-wrapper>
    </div>
    <div class="spinner" v-else>
      <b-spinner variant="primary" label="Cargando"></b-spinner>
    </div>
  </div>
</template>
<script>
import ImageWallWrapper from "../components/image-wall/ImageWallWrapper.vue";
import HeaderSection from "../components/HeaderSection.vue";
export default {
  name: "Sponsors",
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
          degreeSkew: 8,
          border: {
            thickness: 1,
            color: "#041F8A"
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
          scale: 2,
          // duration of transition animation
          duration: 250
        }
      }
    };
  },
  mounted() {
    this.loading = false;
    this.fotos = [
      "http://drive.google.com/uc?export=view&id=1jrayYF-PHahpr4naniecDC7byYSvUgad",
      "http://drive.google.com/uc?export=view&id=1acGCJgr19pyyaPEcnnxrlKzDFNrxfYW6",
      "http://drive.google.com/uc?export=view&id=14qoqcyfJKd5JLEyQm9_YpI77skNKS-bV"
    ];
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
