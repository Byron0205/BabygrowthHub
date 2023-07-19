<template>
    <div>
        <form @submit.prevent="" class="login form-register">
            <div class="input-container ic1">
                <input class="input input-expediente" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Correo</label>
            </div>

            <div class="flex flex-register input-container">
                <div class="input-container ic1">
                    <input class="input input-expediente" type="text" placeholder="">
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Peso del bebé</label>
                </div>
                <div class="input-container ic1">
                    <input class="input input-expediente" type="text" placeholder="">
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Altura del bebé</label>
                </div>
            </div>

            <div class="input-container ic1">
                <input class="input input-expediente" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Género</label>
            </div>
            <div class="input-container ic1">
                <input class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Fecha de Nacimiento</label>
            </div>
            <div class="input-container ic1">
                <input class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Nombre de la Madre</label>
            </div>
            <div class="input-container ic1">
                <input class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder">Nombre del Padre</label>
            </div>

            <div class="input-container text-center">
                <button @click="registerBabyForm" class="submit submit-register pink-background">Modificar</button>
            </div>

        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>