<template>
  <div id="app" class="container-fluid">
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  components: {
    Home
  }}
</script>  

<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.container-fluid {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.col{
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.row{
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

div.spinner {
  height: 700px;
}

 
</style>
