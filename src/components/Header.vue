<template>
  <div class="container-fluid">
    <b-navbar toggleable="sm" type="dark" variant="info" style="padding: 0; ">
      <b-navbar-brand>
        <img src="../../public/escudo_header.png" class="ml-2" height="60" width="90" alt="Escudo" />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-text>
          <div class="col">
            <img
              src="../../public/banner_argentinos.png"
              class="img-fluid rounded-top rounded-bottom"
              height="190"
              width="190"
            />
          </div>
        </b-nav-text>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <b-button
              :to="{ path: '/Presentacion' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >NOSOTROS</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Galeria' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >GALERIA</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Videos' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >VIDEOS</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Campeonato2019' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >CAMPEONES</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Jugadores' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >JUGADORES</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Partidos' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >PARTIDOS</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Resultados' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >TORNEO</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              :to="{ path: '/Sponsors' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >SPONSORS</b-button>
          </b-nav-item>

          <b-nav-item>
            <b-button
              :to="{ path: '/Contacto' }"
              pill
              squared
              variant="outline-light"
              color="white"
              size="sm"
            >CONTACTO</b-button>
          </b-nav-item>
          <div v-if="!usuarioLogueado">
            <b-nav-item>
              <Login @loginUsuario="loginUsuario" />
            </b-nav-item>
          </div>
          <div v-else>
            <b-nav-item>
              <b-button
                pill
                squared
                variant="outline-light"
                color="white"
                size="sm"
                v-on:click="logoutUsuario()"
              >LOGOUT</b-button>
            </b-nav-item>
          </div>
          <b-nav-text>
            <img src="../../public/fondo_header_der.png" class="img-fluid" height="130" width="110" />
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Login from "./Login.vue";
export default {
  name: "Header",
  components: { Login },
  props: {
    usuarioLogueado: Boolean
  },
  methods: {
    logoutUsuario() {
      this.$emit("logoutUsuario");
    },
    loginUsuario() {
      this.$emit("loginUsuario");
    }
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

.col {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
