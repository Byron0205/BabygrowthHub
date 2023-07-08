<template>
  <div class="container">
    <div class="container-img-login">
      <img src="../assets/img/Decoracion-espacio.png" alt="">
      <img class="img-padres-2" src="../assets/img/img-padre.png" alt="">
    </div>
    <login-user />
    <div class="container-img-login">
      <img class="sun-sticker" src="../assets/img/Decoracion-sol.png" alt="">
      <img class="img-padres-1" src="../assets/img/img-madre.png" alt="">
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