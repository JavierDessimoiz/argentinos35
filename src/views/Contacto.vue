<template>
  <div class="container-fluid">
    <HeaderSection icono="fas fa-address-book fa-2x" titulo="CONTACTO" />
    <div class="container-fluid-center">
      <div class="row justify-content-center">
        <b-card no-body class="overflow-hidden mb-4 mt-4 mr-4 ml-4" style="max-width: 450px;">
          <b-row no-gutters class="overflow-hidden mb-2 mt-2 ml-2 mr-2">
            <b-col md="6">
              <b-button
                href="https://www.linkedin.com/in/javierdessimoiz/"
                target="_blank"
                variant="outline-primary"
              >
                <b-icon icon="linkedin" font-scale="7.5"></b-icon>
              </b-button>
            </b-col>
            <b-col md="6">
              <b-card-body title="LinkedIn">
                <b-card-text>
                  <a
                    style=" color: blue;"
                    href="https://www.linkedin.com/in/javierdessimoiz/"
                    target="_blank"
                  >https://www.linkedin.com/in/javierdessimoiz/</a>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>

          <b-row no-gutters class="overflow-hidden mb-2 mt-2">
            <b-col md="6">
              <b-button
                href="https://github.com/JavierDessimoiz"
                target="_blank"
                variant="outline-dark"
              >
                <b-icon icon="github" font-scale="7.5"></b-icon>
              </b-button>
            </b-col>
            <b-col md="6">
              <b-card-body title="GitHub">
                <b-card-text>
                  <a
                    style=" color: blue;"
                    href="https://github.com/JavierDessimoiz"
                    target="_blank"
                  >https://github.com/JavierDessimoiz</a>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>

          <b-row no-gutters class="overflow-hidden mb-2 mt-2">
            <b-col md="6">
              <b-button href="mailto:argentinos35@gmail.com" target="_blank" variant="outline-danger">
                <b-icon icon="envelope" font-scale="7.5"></b-icon>
              </b-button>
            </b-col>
            <b-col md="6">
              <b-card-body title="Email a Argentinos">
                <b-card-text>
                  <a
                    style=" color: blue;"
                    href="mailto:argentinos35@gmail.com"
                    target="_blank"
                  >argentinos35@gmail.com</a>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";

export default {
  name: "Contacto",
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

.row {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
