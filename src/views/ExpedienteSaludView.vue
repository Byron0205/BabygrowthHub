<template>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-Salud.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/salud/' + this.idBebe">Salud</router-link>
            </div>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-beaker.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/medicacion/' + this.idBebe">Medicación</router-link>
            </div>
        </MenuLateral>

        <div class="container-expediente">
            <div class="container-nombre-expediente">
                <div v-if="DatosBebe.Sexo == 'F'" class="baby-name-container-salud">
                    <p class="baby-name text-center">
                        Estas viendo los datos de la pequeña<br>
                        <span class="name">{{ DatosBebe.Nombre }} {{ DatosBebe.Apellidos }}</span>
                    </p>
                </div>
                <div v-else class="baby-name-container-salud">
                    <p class="baby-name">
                        Estas viendo los datos del pequeño<br>
                        <span class="name">{{ DatosBebe.Nombre }} {{ DatosBebe.Apellidos }}</span>
                    </p>
                </div>
            </div>

            <div class="header-expediente">
                <p class="title-expediente">Expediente de Salud</p>
            </div>
            <div class="body-expediente">
                <ExpedienteBebe />
                <verDatosPadecimiento />
            </div>
        </div>
    </div>
</template>

<script>
import ExpedienteBebe from '../components/ExpedienteBaby.vue'
import MenuLateral from '../components/MenuLateral.vue'
import verDatosPadecimiento from '../components/VerDatosPadecimiento.vue';
import axios from 'axios';
export default {
    data() {
        return {
            idBebe: '',
            DatosBebe: {
                IDBebe: '',
                Nombre: '',
                Apellidos: '',
                Edad: '',
                FechaNacimiento: '',
                Sexo: '',
                Altura: '',
                Peso: ''
            },
        }
    },
    components: { MenuLateral, ExpedienteBebe, verDatosPadecimiento },
    mounted() {
        this.checkUserSession();
        this.idBebe = this.$route.params.id;
        this.obtenerExpediente(this.idBebe);
    },
    methods: {
        checkUserSession() {
            const sessionValue = localStorage.getItem('session');
            if (sessionValue === '0' || sessionValue === undefined) {
                this.$router.push('/login');
            }
        },
        obtenerExpediente(id) {
            const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/verExpediente/' + id
            axios.get(url)
                .then(response => {
                    this.DatosBebe = response.data;
                })
                .catch(err => {
                    console.error('Error al obtener los datos: ' + err)
                })
        },
    }
}
</script>

<style></style>