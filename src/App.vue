<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import NavbarBurguer from './components/Navabar-hamburguesa.vue';

</script>

<template>
  <NavbarBurguer/>
  <RouterView />
  <Footer/>
</template>

<style scoped>

</style>
