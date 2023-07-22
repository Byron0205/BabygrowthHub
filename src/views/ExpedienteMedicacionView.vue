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


        <div class="baby-container-medicacion-datos">
            <div class="baby-name-container">
                <p class="baby-name">Estas viendo los datos del pequeño<br><span class="name">{{ baby }}</span></p>
            </div>

            <div class="baby-container-msg">
                <img src="../assets/img/Decoracion.png" alt="icon">
                <p class="baby-msg">Recuerda que mantener actualizado el expediente de medicación de tu precioso bebé es
                    fundamental para garantizar su bienestar!</p>
            </div>

            <VerDatosMedicamentos/>
        </div>
    </div>
</template>

<script>
import ExpedienteBebe from '../components/ExpedienteBaby.vue'
import MenuLateral from '../components/MenuLateral.vue'
import VerDatosMedicamentos from '../components/VerDatosMedicamentos.vue';
export default {
    components: { MenuLateral, ExpedienteBebe, VerDatosMedicamentos },
    data() {
        return {
            baby: 'Ismael Rosales Mora'
        }
    }
}
</script>

<style></style>