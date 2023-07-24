<template>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-Salud.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/salud/'+ this.idBebe">Salud</router-link>
            </div>
            <div class="item-lateral">
                <img src=".https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-beaker.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/medicacion/'+ this.idBebe">Medicación</router-link>
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
    data(){
        return{
            idBebe: ''
        }
    },
    components: { MenuLateral, ExpedienteBebe, verDatosPadecimiento },
    mounted(){
        if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
    },
    mounted(){
        this.idBebe= this.$route.params.id;
    }
}
</script>

<style></style>