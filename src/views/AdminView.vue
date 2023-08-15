<template>
    <h1 class="text-center">Bienvenido al area de Administración</h1>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <router-link class="link-menu" :to="'/admin' + this.idBebe"><span class="link-item-text"><i
                            class="fa-solid fa-user"></i> Usuarios</span>
                </router-link>
            </div>
        </MenuLateral>
        <Tabla titulo="Usuarios">
            <UserAdminCard />
        </Tabla>
    </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import MenuLateral from '../components/MenuLateral.vue';
import UserAdminCard from '../components/UserAdminCard.vue';
export default {
    components: {
        Tabla, MenuLateral, UserAdminCard
    }
}
</script>

<style></style>