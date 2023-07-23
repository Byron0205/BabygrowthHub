<template>
  <div class="flex-table-menu">
    <MenuLateral>
      <div class="item-lateral">
                <img src="../assets/img/icono-reloj.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/seguimiento">Seguidor</router-link>
            </div>
            <div class="item-lateral">
                <img src="../assets/img/icono-calendario.svg" alt="reloj">
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
    if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
  }
};
</script>
