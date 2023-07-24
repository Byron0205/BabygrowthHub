<template>
    <div class="flex-table-menu">
        <menu-lateral>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-reloj.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/seguimiento">Seguidor</router-link>
            </div>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-calendario.svg" alt="reloj">
                <router-link class="link-menu" to="/actividades/calendario">Calendario</router-link>
            </div>
        </menu-lateral>
        <Tabla titulo="Hoy dia">
            <taskviewer/>
        </Tabla>
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import MenuLateral from '../components/MenuLateral.vue';
import taskviewer from '../components/taskviewer.vue';
export default {
    components:{
        Tabla,
        MenuLateral,
        taskviewer
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
}
</script>

<style></style>