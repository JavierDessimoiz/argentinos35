<template>
  <div >
    <b-button
      pill
      squared
      variant="outline-light"
      color="white"
      size="sm"
      v-on:click="mostrarModalLogin()"
      >LOGIN
    </b-button>
    <b-modal ref="modalLogin" title="Admin" hide-footer centered>
      <div class="form-group">
        <label>Usuario</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="usuario"
        />

      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="contrasenia"
        />
      </div>
      <button
        v-if="!loading"
        type="submit"
        class="btn btn-dark btn-lg btn-block"
        v-on:click="ingresar(usuario, contrasenia)"
      >
        Ingresar
      </button>
      <button
        v-else
        disabled
        type="submit"
        class="btn btn-dark btn-lg btn-block"
      >
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </button>
    </b-modal>

    <!-- Modal usuario y/o contraseña incorrecto  -->
    <b-modal ref="modalError" title="Error" ok-only centered>
      <p class="my-4">Usuario y/o contraseña incorrecto</p>
    </b-modal>
    <!-- Modal error rest -->
    <b-modal ref="modalErrorRest" title="Error" ok-only centered>
      <p class="my-4">Error interno: {{ error }}</p>
    </b-modal>
  </div>
</template>

<script>
import { administradoresService } from "./../js/services/administradoresService.js";
export default {
  name: "Login",
  components: {},
  props: {
    usuarioLogueado: Boolean
  },
  data() {
    return {
      usuario: null,
      contrasenia: null,
      loading: false,
      error: null
    };
  },
  methods: {
      mostrarModalLogin() {
        this.$refs.modalLogin.show();
    },
    ingresar(usuario, contrasenia) {
      this.loading = true;
      administradoresService
        .getAdministradorByUsuarioAndContrasenia(usuario, contrasenia)
        .then(response => {
          this.loading = false;
          if (response.data && response.data.length > 0) {    
            localStorage.setItem("usuario", response.data[0].usuario);
            this.$emit("loginUsuario");
          } else {
            localStorage.removeItem("usuario");
            this.$refs.modalError.show();
          }
        })
        .catch(error => {
          this.$refs.modalErrorRest.show();
          localStorage.removeItem("usuario");
          this.error = error;
          this.loading = false;
        });
        this.usuario=null;
        this.contrasenia=null;
    }
  }
};
</script>

<style>
</style>
