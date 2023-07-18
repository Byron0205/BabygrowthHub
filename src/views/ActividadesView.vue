<template>
    <div class="flex-table-menu">
        <menu-lateral>
            <div class="item-lateral">
                <img src="../assets/img/icono-reloj.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/seguimiento">Seguidor</router-link>
            </div>
            <div class="item-lateral">
                <img src="../assets/img/icono-calendario.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/calendario">Calendario</router-link>
            </div>
        </menu-lateral>
        <Tabla titulo="Hoy dia">
            <div class="actividad">Actividad</div>
        </Tabla>
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import MenuLateral from '../components/MenuLateral.vue';
export default {
    components:{
        Tabla,
        MenuLateral
    }
}
</script>

<style></style>