<template>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <img src="../assets/img/icono-Salud.svg" alt="reloj">
                <router-link class="link-menu" to="/expediente/salud">Salud</router-link>
            </div>
            <div class="item-lateral">
                <img src="../assets/img/icono-beaker.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/calendario">Medicación</router-link>
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