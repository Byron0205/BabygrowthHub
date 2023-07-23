<template>
    <nav>
        <div class="container-img">
            <img class="img" src="../assets/img/Fondo-de-nubes.png" alt="fondo nubes">

        </div>
        <div class="container-logo">
            <img class="img-logo" src="../assets/img/logo.png" alt="logo">
        </div>
        <div :class="session ? 'flex-session': 'flex margin-nav'">
            <ul class="navbar">
                <li class="item">
                    <router-link v-if="session" class="link" to="/inicio">Inicio</router-link>
                    <router-link v-else class="link" to="/">Inicio</router-link>
                </li>
                <li class="item">
                    <router-link v-show="session" class="link" to="/expediente/salud">Expendiente&Medicacion</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/dietas">Dietas</router-link>
                </li>
                <li class="item">
                    <router-link v-show="session" class="link" to="/preguntas-respuestas">Preguntas&Respuestas</router-link>
                </li>
                <li class="item">
                    <router-link v-show="session" class="link" to="/actividades/seguimiento">Actividad</router-link>
                </li>
                <li class="item">
                    <router-link v-show="session" class="link" to="/perfil">Perfil</router-link>
                </li>
            </ul>
            
            <div class="btn-group">
                <button v-if="session" @click="salir" class="btn-registro">Salir</button>
                <button v-else @click="login" class="btn-inicio">Iniciar Sesion</button>
            </div>
            
        </div>
    </nav>
    <div class="container-img">
        <img class="img-efecto-nube" src="../assets/img/Efecto-nube.png" alt="efecto">
    </div>
</template>

<script>
export default {
    data(){
        return{
            session: true
        }
    },
    methods:{
        login(){
            this.$router.push('/login')
        },
        salir(){
            localStorage.removeItem('session')
            this.$router.push('/')
        },
        created(){
        const validatedSession = localStorage.getItem('session')
        if (validatedSession == '1'){
            this.session = true
        }else{
            this.session = false
        }
    }
    },
    watch:{
        $route() {
            this.created();
        }
    },
}
</script>

<style></style>