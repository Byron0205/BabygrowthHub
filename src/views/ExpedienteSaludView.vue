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

        <div class="container-expediente">
            <div class="header-expediente">
                <p class="title-expediente">Expediente de Salud</p>
            </div>
            <div class="body-expediente">
                <ExpedienteBebe/>
                <verDatosMedicacion/>
            </div>
        </div>
    </div>
</template>

<script>
import ExpedienteBebe from '../components/ExpedienteBebe.vue'
import MenuLateral from '../components/MenuLateral.vue'
import verDatosMedicacion from '../components/VerDatosMedicacion.vue';
export default {
    components: { MenuLateral, ExpedienteBebe, verDatosMedicacion },

}
</script>

<style></style>