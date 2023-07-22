<template>
    <div>
        <div class="c-login">
            <div class="c-login-header">
                ¡Bienvenido de nuevo!
            </div>
            <div class="c-login-body">
                <form @submit.prevent="login" class="login">
                    <div class="input-container ic1">
                        <input v-model="correo" class="input" type="text" placeholder="">
                        <div class="cut"></div>
                        <label class="placeholder">Correo</label>
                    </div>

                    <div class="input-container ic1">
                        <input v-model="contrasenna" class="input" type="password" placeholder="">
                        <div class="cut"></div>
                        <label class="placeholder">Contraseña</label>
                    </div>
                    <button class="submit">Iniciar Sesión</button>
                </form>

                <div class="divider"></div>
                <p class="text-option">¿No tienes una cuenta? <span @click="registerParent" class="option">¡Creemos una nueva juntos!</span></p>

                <!-- <p class="text-option">¿Olvido su contraseña? <span class="option">¡Aquí te ayudamos!</span></p> -->

                <div class="divider"></div>
                <form @submit.prevent="validBabyCode" class="login">
                    <p class="text-option">Unirse mediante un <span class="option">código</span></p>
                    <div class="input-container">
                        <input class="input" type="text" placeholder="">
                    </div>
                    <button @click="encargadoForm" class="submit submit-2">Unirse mediante Código</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            correo:'',
            contrasenna:''
        }
    },
    methods:{
        login(){
            axios.post('http://localhost:3000/login',{correo: this.correo, contrasenna:this.contrasenna})
            .then(response =>{
                //success response
                let msg = response.data
                console.log(msg)
                this.$router.push('/inicio')
            })
            .catch(error =>{
                //error management
                console.error('Error al hacer el login: ', error)
            })


            
        },
        validBabyCode(){},
        registerParent(){
            this.$router.push('/registro/1')
        }, 
        encargadoForm(){
            this.$router.push('/registro/2')
        }
    }
}
</script>

<style></style>