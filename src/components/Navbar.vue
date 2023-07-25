<template>
    <nav>
        <div class="container-img">
            <img class="img" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Fondo-de-nubes.png"
                alt="fondo nubes">
        </div>
        <div class="container-logo">
            <img class="img-logo" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/logo.png" alt="logo">
        </div>
        <div :class="session ? 'flex-session' : 'flex margin-nav'">
            <ul class="navbar">
                <li class="item">
                    <router-link v-if="session" class="link" to="/inicio">Inicio</router-link>
                    <router-link v-else class="link" to="/">Inicio</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/etapas-desarrollo">Etapas</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/dietas">Dietas</router-link>
                </li>
                <!-- <li class="item" v-show="session && (rol === 1 || rol === 2)">
                    <router-link class="link" to="/preguntas-respuestas">Preguntas&Respuestas</router-link>
                </li> -->
                <li class="item" v-show="session && (rol === 1 || rol === 2)">
                    <router-link class="link" to="/actividades/seguimiento">Actividad</router-link>
                </li>
                <li class="item" v-show="session && rol !== 0">
                    <router-link class="link" to="/perfil">Perfil</router-link>
                </li>
            </ul>
            <div class="btn-group">
                <button v-if="session" @click="salir" class="btn-registro">Salir</button>
                <button v-else @click="login" class="btn-inicio">Iniciar Sesion</button>
            </div>
        </div>
    </nav>
    <div class="container-img">
        <img class="img-efecto-nube" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Efecto-nube.png"
            alt="efecto">
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            session: false,
            rol: 0
        }
    },
    methods: {
        login() {
            this.$router.push('/login')
        },
        salir() {
            localStorage.removeItem('session')
            localStorage.removeItem('idAdulto')
            localStorage.removeItem('userRol')
            if (this.$route.path === '/'){
                window.location.reload()
            } else {
                this.$router.push('/')
            }
        },
        created() {
            const validatedSession = localStorage.getItem('session')
            const validatedRol = localStorage.getItem('userRol')

            if (validatedSession === '1' || validatedSession === '2' || validatedSession === '3') {
                this.session = true;
                this.rol = parseInt(validatedRol);
            } else {
                this.session = false;
                this.rol = 0;
            }
        }
    },
    watch: {
        $route() {
            this.created();
        }
    },
    created() {
        this.created();
    }
}
</script>
