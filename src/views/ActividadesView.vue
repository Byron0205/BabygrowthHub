<template>
    <div class="flex-table-menu">
        <menu-lateral></menu-lateral>
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