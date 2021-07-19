<template>
  <div class="container-fluid">
    <Header
      v-bind:usuarioLogueado="this.usuarioLogueado"
      @logoutUsuario="logoutUsuario"
      @loginUsuario="loginUsuario"
    />
    <Body v-bind:usuarioLogueado="this.usuarioLogueado" v-bind:usuario="this.usuario"/>
    <Footer />
    <!-- Modal Deslogueo -->
    <b-modal ref="modalLogout" title="Logout Admin." @ok="desloguear()" centered>
      <span>¿Está seguro que desea desloguearse?</span>
    </b-modal>git a
        <!-- Modal login correcto  -->
    <b-modal ref="modalSuccess" title="Login Admin." ok-only centered>
      <p class="my-4">Bienvenido <strong>{{ this.usuario }}</strong>, ya podés administrar la página</p>
    </b-modal>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Body from "@/components/Body.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Body,
    Footer
  },
  data() {
    return {
      usuario: null,
      usuarioLogueado: false
    };
  },

  methods: {
    getLocalStorageUsuario() {
      this.usuario = localStorage.getItem("usuario");
      if (this.usuario != null) {
        this.usuarioLogueado = true;
      } else {
        this.usuarioLogueado = false;
      }
    },
    logoutUsuario() {
      this.$refs.modalLogout.show();
    },
    desloguear() {
      localStorage.removeItem("usuario");
      this.getLocalStorageUsuario();
    },
    loginUsuario(){
      this.getLocalStorageUsuario();
      this.$refs.modalSuccess.show();
    },
  },
  mounted() {
    this.getLocalStorageUsuario();
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