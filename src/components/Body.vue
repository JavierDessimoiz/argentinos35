<template>
  <div class="container-fluid">
    <div class="bg">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Partidos v-bind:usuarioLogueado="this.usuarioLogueado" v-bind:usuario="this.usuario" />
      <Noticias v-bind:usuarioLogueado="this.usuarioLogueado" v-bind:usuario="this.usuario" />
    </div>
  </div>
</template>


<script>
import Partidos from "./Partidos.vue";
import Noticias from "./Noticias.vue";
export default {
  name: "Body",
  components: { Partidos, Noticias },
  props: {
    usuarioLogueado: Boolean,
    usuario: String
  }
};

</script>

<style scoped>
.container-fluid {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

body,
html {
  height: 100%;
}

.bg {
  background-image: url("https://i.ibb.co/7NykvBc/escudo-arg.png");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 0cm;
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.5, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translatey(200px);
  opacity: 0;
}
</style>


