<template>
    <nav>
        <div class="container-img">
            <img class="img" src="../assets/img/Fondo-de-nubes.png" alt="fondo nubes">

        </div>
        <div class="container-logo">
            <img class="img-logo" src="../assets/img/logo.png" alt="logo">
        </div>
        <div class="flex">
            <ul class="navbar">
                <li class="item">
                    <router-link class="link" to="/">Inicio</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/expediente/salud">Expendiente&Medicacion</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/dietas">Dietas</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/">Preguntas&Respuestas</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/actividades/seguimiento">Actividad</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/perfil">Perfil</router-link>
                </li>
            </ul>
            <!-- <div>
                <button class="btn">Salir</button>
            </div> -->
            <div class="btn-group">
                <button @click="login" class="btn-inicio">Iniciar Sesion</button>
                <!-- <button @click="register" class="btn-registro">Registrarse</button> -->
            </div>
            
        </div>
    </nav>
    <div class="container-img">
        <img class="img-efecto-nube" src="../assets/img/Efecto-nube.png" alt="efecto">
    </div>
</template>

<script>
export default {
    methods:{
        login(){
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/registro/1')
        }
    }
}
</script>

<style></style>