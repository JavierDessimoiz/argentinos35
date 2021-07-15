<template>
  <div class="container-fluid">
    <div class="bg" style="background-color:#1890a3;">
      <div class="row-center"></div>
      <div class="row-rigth">
        <h4 class="mb-3" style="color: white; text-shadow: 2px 2px 4px #000000;">
          <b-icon icon="star-fill" font-scale="1" animation="fade"></b-icon>Campeón Don Bosco 2019
        </h4>
      </div>
      <b-button style=" color: white; text-shadow: 2px 2px 4px #000000;" class="text-decoration-none" variant="link" size="lg"><b-icon-instagram></b-icon-instagram> <a style=" color: white;" href="https://www.instagram.com/argentinos35/" target="_blank"> Seguinos </a> </b-button>
      <div class="row-center mt-1">
        <h5 style=" color: white; text-shadow: 2px 2px 4px #000000;">
          Sponsors:
          <br />
          <a style=" color: white;" href="https://www.instagram.com/elviejo.carlos/" target="_blank"> El viejo Carlos</a> |
          <a style=" color: white;" href="https://www.instagram.com/elviejo.carlos/" target="_blank">SETIA</a>|
          <a style=" color: white;" href="https://www.instagram.com/brullen_garage/?hl=es" target="_blank">Brüllen Garage</a>
        </h5>
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

.a{
  color: white;
}
</style>
