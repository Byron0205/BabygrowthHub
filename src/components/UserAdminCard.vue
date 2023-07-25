<template>
    <div class="task" v-for="user in Users" :key="user">
        <div class="info-task">
            <div class="info-left-task">
                <p class="task-name">{{ user.Nombre }}</p>
            </div>
            <div class="info-right-task">
                <p class="task-priority">
                    {{ user.Rol }}
                </p>
            </div>
        </div>
        <div class="description-task " style="padding: 1rem;">
            <div>
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-texto.svg" alt="label" />
            </div>
            <div class="description-task-text color">Registrado(a) desde: {{ formatDate(user.FechaRegistro) }}</div>
        </div>
        <div class="description-task " style="padding: 1rem;">
            <div>
                <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-texto.svg" alt="label" />
            </div>
            <div class="description-task-text color">Padre de: {{ user.Bebe }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            Users: {
                Nombre: "",
                FechaRegistro: "",
                Rol: "",
                Bebe: "",
                Correo: ""
            }
        }
    },
    methods: {
        obtenerUsuarios() {
            const url = "http://localhost:3000/verUsuarios"

            axios.get(url)
                .then(response => {
                    this.Users = response.data;
                })
                .catch(error => {
                    console.log('Error al obtener los usuario: ' + error)
                })
        },
        formatDate(isoDate) {
            const date = new Date(isoDate);
            const day = date.getDate();
            const month = date.getMonth() + 1; // Los meses en JavaScript son base 0, por eso sumamos 1
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    },
    mounted(){
        this.obtenerUsuarios()
    }
}
</script>

<style></style>