<template>
  <div class="flex-table-menu">
    <MenuLateral>
      <div class="item-lateral">
        <router-link class="link-menu" to="/actividades/seguimiento">
          <span class="link-item-text">
            <i class="far fa-clock"></i> Seguidor</span>
        </router-link>
      </div>
      <div class="item-lateral">
        <router-link class="link-menu" to="/actividades/calendario">
          <span class="link-item-text"
            ><i class="fa-regular fa-calendar"></i> Calendario</span
          >
        </router-link>
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
  mounted() {
    this.checkUserSession();
    if (localStorage.getItem('session') !== '1') {
      this.$router.push('/login')
    }
  },
  methods: {
    checkUserSession() {
      const sessionValue = localStorage.getItem('session');
      if (sessionValue === '0' || sessionValue === undefined) {
        this.$router.push('/login');
      }
    }
  }
};
</script>
