<template>
  <div class="container">
    <div class="container-img-login">
      <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-espacio.png" alt="">
      <img class="img-padres-2" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-sol.png" alt="">
    </div>
    <tokenComp />
    <div class="container-img-login">
      <img class="sun-sticker" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-sol.png" alt="">
      <img class="img-padres-1" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/img-madre.png" alt="">
    </div>
  </div>
</template>

<script>
import tokenComp from '../components/ValidToken.vue'
export default {
  components: { tokenComp },
  methods:{
    checkUserSession() {
            const sessionValue = localStorage.getItem('session');
            if (sessionValue === '0' || sessionValue === undefined) {
                this.$router.push('/login');
            }
        }
  },
  mounted(){
    this.checkUserSession()
  }
}
</script>

<style></style>