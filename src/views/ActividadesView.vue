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
                    <span class="link-item-text"><i class="fa-regular fa-calendar"></i> Calendario</span>
                </router-link>
            </div>
        </MenuLateral>
        <Tabla titulo="Hoy dia">
            <taskviewer />
        </Tabla>
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import MenuLateral from '../components/MenuLateral.vue';
import taskviewer from '../components/taskviewer.vue';
export default {
    components: {
        Tabla,
        MenuLateral,
        taskviewer
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
}
</script>

<style></style>