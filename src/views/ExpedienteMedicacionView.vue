<template>
    <div class="flex-table-menu">
        <MenuLateral>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-Salud.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/salud/'+ this.DatosBebe.IDBebe">Salud</router-link>
            </div>
            <div class="item-lateral">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-beaker.svg" alt="reloj">
                <router-link class="link-menu" :to="'/expediente/medicacion/'+ this.DatosBebe.IDBebe">Medicación</router-link>
            </div>
        </MenuLateral>


        <div class="baby-container-medicacion-datos">
            <div v-if="DatosBebe.Sexo == 'F'" class="baby-name-container">
                <p class="baby-name">Estas viendo los datos de la pequeña<br><span class="name">{{ DatosBebe.Nombre }} {{ DatosBebe.Apellidos }}</span></p>
            </div>
            <div v-else class="baby-name-container">
                <p class="baby-name">Estas viendo los datos del pequeño<br><span class="name">{{ DatosBebe.Nombre }} {{ DatosBebe.Apellidos }}</span></p>
            </div>


            <div class="baby-container-msg">
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion.png" alt="icon">
                <p class="baby-msg">Recuerda que mantener actualizado el expediente de medicación de tu precioso bebé es
                    fundamental para garantizar su bienestar!</p>
            </div>

            <VerDatosMedicamentos/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ExpedienteBebe from '../components/ExpedienteBaby.vue'
import MenuLateral from '../components/MenuLateral.vue'
import VerDatosMedicamentos from '../components/VerDatosMedicamentos.vue';
export default {
    components: { MenuLateral, ExpedienteBebe, VerDatosMedicamentos },
    data() {
        return {
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
    methods:{
        checkUserSession() {
            const sessionValue = localStorage.getItem('session');
            if (sessionValue === '0' || sessionValue === undefined) {
                this.$router.push('/login');
            }
        },
        obtenerExpediente(id) {
            const url = 'http://localhost:3000/verExpediente/' + id
            axios.get(url)
                .then(response => {
                    this.DatosBebe = response.data;
                    const fechaObjeto = new Date(this.DatosBebe.FechaNacimiento)

                    // Obtener los componentes de la fecha (día, mes, año)
                    const dia = String(fechaObjeto.getDate()).padStart(2, '0');
                    const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0');
                    const anio = fechaObjeto.getFullYear();

                    // Formatear la fecha en el formato "dd/mm/yyyy"
                    const fechaFormateada = `${dia}/${mes}/${anio}`;

                    this.DatosBebe.FechaNacimiento = fechaFormateada;
                })
                .catch(err => {
                    console.error('Error al obtener los datos: ' + err)
                })
        },
    },
    mounted(){
        if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
        this.checkUserSession()
        const idBebe = this.$route.params.id;
        this.obtenerExpediente(idBebe);
    }
}
</script>

<style></style>