<template>
    <h1 class="text-center">Bienvenido al area de Administración</h1>
    <div class="flex-table-menu">
        <MenuLateral>
            <router-link class="link-menu" to="/admin">Usuarios</router-link>
        </MenuLateral>
        <Tabla titulo="Usuarios">
            <UserAdminCard/>
        </Tabla>
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import MenuLateral from '../components/MenuLateral.vue';
import UserAdminCard from '../components/UserAdminCard.vue';
export default {
    components:{
        Tabla, MenuLateral, UserAdminCard
    }
}
</script>

<style>

</style>