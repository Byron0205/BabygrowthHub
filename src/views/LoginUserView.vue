<template>
  <div class="container">
    <div class="container-img-login">
      <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-espacio.png" alt="">
      <img class="img-padres-2" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/img-padre.png" alt="">
    </div>
    <login-user />
    <div class="container-img-login">
      <img class="sun-sticker" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-sol.png" alt="">
      <img class="img-padres-1" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/img-madre.png" alt="">
    </div>
  </div>
</template>

<script>
import LoginUser from '../components/LoginUser.vue'
export default {
  components: { LoginUser },

}
</script>

<style></style>