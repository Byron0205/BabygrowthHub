<template>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <img src="../assets/img/icono-Salud.svg" alt="reloj">
                <router-link class="link-menu" to="/expediente/salud">Salud</router-link>
            </div>
            <div class="item-lateral">
                <img src="../assets/img/icono-beaker.svg" alt="reloj">
                <router-link class="link-menu" to="/expediente/medicacion">Medicación</router-link>
            </div>
        </MenuLateral>

        <div class="container-expediente">
            <div class="header-expediente">
                <p class="title-expediente">Expediente de Salud</p>
            </div>
            <div class="body-expediente">
                <ExpedienteBebe/>
                <verDatosPadecimiento/>
            </div>
        </div>
    </div>
</template>

<script>
import ExpedienteBebe from '../components/ExpedienteBaby.vue'
import MenuLateral from '../components/MenuLateral.vue'
import verDatosPadecimiento from '../components/VerDatosPadecimiento.vue';
export default {
    components: { MenuLateral, ExpedienteBebe, verDatosPadecimiento },

}
</script>

<style></style>