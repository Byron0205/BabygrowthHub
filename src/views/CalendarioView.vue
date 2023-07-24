<template>
  <div class="flex-table-menu">
    <MenuLateral>
      <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-reloj.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/seguimiento">Seguidor</router-link>
            </div>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-calendario.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/calendario">Calendario</router-link>
            </div>
    </MenuLateral>
    <Calendario />
  </div>
</template>

<script>
import Calendario from "../components/Calendario.vue";
import MenuLateral from "../components/MenuLateral.vue";
export default {
  components: {
    Calendario,
    MenuLateral
  },
  mounted(){
    this.checkUserSession();
    if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
  },
  methods:{
    checkUserSession() {
            const sessionValue = localStorage.getItem('session');
            if (sessionValue === '0' || sessionValue === undefined) {
                this.$router.push('/login');
            }
        }
  }
};
</script>
