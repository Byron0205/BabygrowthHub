<template>
    <div>
        <div class="c-login">
            <div class="c-login-header">
                ¡Bienvenido de nuevo!
            </div>
            <div class="c-login-body">
                <form @submit.prevent="" class="login">
                    <div class="input-container ic1">
                        <input id="firstname" class="input" type="text" placeholder="">
                        <div class="cut"></div>
                        <label for="firstname" class="placeholder">Correo</label>
                    </div>

                    <div class="input-container ic1">
                        <input id="firstname" class="input" type="text" placeholder="">
                        <div class="cut"></div>
                        <label for="firstname" class="placeholder">Contraseña</label>
                    </div>
                    <button class="submit">Iniciar Sesión</button>
                </form>

                <p class="text-option">¿No tienes una cuenta? <span @click="registerParent" class="option">¡Creemos una nueva juntos!</span></p>

                <!-- <p class="text-option">¿Olvido su contraseña? <span class="option">¡Aquí te ayudamos!</span></p> -->

                <div class="divider"></div>
                <form class="login">
                    <p class="text-option">Unirse mediante un <span class="option">código</span></p>
                    <div class="input-container">
                        <input id="firstname" class="input" type="text" placeholder="">
                    </div>
                    <button @click="registerEncargado" class="submit submit-2">Unirse mediante Código</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        registerParent(){
            this.$router.push('/registro/1')
        }, 
        registerEncargado(){
            this.$router.push('/registro/2')
        }
    }
}
</script>

<style></style>