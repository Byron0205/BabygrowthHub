<template>
    <div>
        <div class="profile-container">
            <div class="profile-card">
                <i class="fa-regular fa-circle-user custom-icon-profile" style="color: #4F439A;"></i>
                <h2 class="text-profile">Perfil</h2>
                <div class="profile-role">
                    <h3>MADRE</h3>
                </div>
            </div>
            <div class="information-container">
                <div class="personal-information-container">
                    <div class="personal-information">
                        <label for="name">Nombre</label>
                        <input type="text" class="input-modify">
                        <label for="last-name">Apellidos</label>
                        <input type="text" class="input-modify">
                        <label for="contact">Contacto</label>
                        <input type="text" class="input-modify">
                        <button class="modify">MODIFICAR</button>
                    </div>
                </div>
                <div class="son-information-container">
                    <div class="son-information">
                        <label for="sons" class="sons-text">Hijos registrados</label>
                        <select class="sons">
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <label for="">Selecciona uno de tus tesoros para:</label>
                        <button class="btn-galery">Galería del recuerdo</button>
                        <button class="btn-expedient">Expediente salud medicación</button>
                        <button class="btn-baby-code">Compartir código bebé</button>
                    </div>
                </div>
            </div>
            <div class="administrative-panel-container">
                <div class="administrative-panel">
                    <h2>Panel administrativo</h2>
                    <button class="family-admin">Administrar familia</button>
                    <button class="add-baby">Agregar otro bebé</button>
                </div>
            </div>
        </div>
        <div class="rainbow-decoration">
            <img src="../../assets/img/Decoracion-arcoiris.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'BabygrowthHubPerfilView',

    data() {
        return {

        };
    },

    mounted() {
        if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>