<template>
  <div class="container-fluid">
    <div class="bg" style="background-color:#1890a3;">
      <div class="row-center "></div>
      <div class="row-rigth">
        <h4 class="mb-5" style="color: white; text-shadow: 2px 2px 4px #000000;">
          <b-icon icon="star-fill" font-scale="1" animation="fade"> </b-icon>
          Campeón Don Bosco 2019
        </h4>
      </div>
      <!--
        <div class="row-center">
        <img
          src="../../public/banner_argentinos.png"
          class="img-fluid"
          height="180"
          width="270"
        />s
      </div>
        -->
       
      <div class="row-center mt-5">
        <h6 style=" color: white; text-shadow: 2px 2px 4px #000000;">
          Sponsors: <br> El viejo Carlos | SETIA | Brüllen Garage 
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
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

.bg {
  background-image: url("../../public/fondo_footer.png");
  background-position-y: top;
  background-position: top;
  background-repeat: no-repeat;

  background-position-y: 0cm;
}

</style>
