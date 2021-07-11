<template>
  <div class="container-fluid">
    <div class="row" style="background-color: #041F8A;">
      <div class="col-2">
        <i style="color: white; text-shadow: 2px 2px 4px #000000;" class="fas fa-angle-double-right"></i>
      </div>
      <div class="col-8">
        <h4 style="color: white; text-shadow: 2px 2px 4px #000000; align-text:center;"> {{ titulo }}</h4>
      </div>
      <div class="col-2"><i :class="icono" style="color: white;"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSection",

  props: {
    icono: String,
    titulo: String
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
 