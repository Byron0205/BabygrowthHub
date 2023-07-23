<template>
    <div>
        <form @submit.prevent="actualizarDatos" class="login form-register">
            <div class="input-container ic1">
                <input class="input input-expediente" :disabled="!activarForm" type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Nombre del Bebé</label>
            </div>

            <div class="flex flex-register input-container">
                <div class="input-container ic1">
                    <input class="input input-expediente" :disabled="!activarForm" type="text" placeholder="">
                    <div class="cut"></div>
                    <label class="placeholder">Peso del bebé</label>
                </div>
                <div class="input-container ic1">
                    <input class="input input-expediente" :disabled="!activarForm" type="text" placeholder="">
                    <div class="cut"></div>
                    <label class="placeholder">Altura del bebé</label>
                </div>
            </div>

            <div class="input-container ic1">
                <input class="input input-expediente" :disabled="!activarForm" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Género</label>
            </div>
            <div class="input-container ic1">
                <input class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Fecha de Nacimiento</label>
            </div>
            <div class="input-container ic1">
                <input class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Nombre de la Madre</label>
            </div>
            <div class="input-container ic1">
                <input class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Nombre del Padre</label>
            </div>

            <div class="input-container text-center">
                <button @click="registerBabyForm" v-text="btn" class="submit submit-register pink-background"></button>
            </div>

        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btn: 'Modificar',
            activarForm: false
        }
    },
    methods: {
        actualizarDatos() {
            if (this.btn == 'Modificar'){
                this.btn = 'Confirmar'
                this.activarForm= true
            }else{
                this.btn= 'Modificar'
                this.activarForm= false
            }
        }
    }
}
</script>

<style></style>