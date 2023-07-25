<template>
    <div>
        <form @submit.prevent="actualizarDatos" class="login form-register">
            <div class="input-container ic1">
                <input v-model="DatosBebe.Nombre" class="input input-expediente" :disabled="!activarForm" type="text"
                    placeholder="">
                <div class="cut"></div>
                <label class="placeholder-expediente">Nombre del Bebé</label>
            </div>

            <div class="flex flex-register input-container">
                <div class="input-container ic1">
                    <input v-model="DatosBebe.Peso" maxlength="4" class="input input-expediente" :disabled="!activarForm"
                        type="text" placeholder="">
                    <div class="cut"></div>
                    <label class="placeholder-expediente">Peso del bebé <sub>(Kg)</sub> </label>
                </div>
                <div class="input-container ic1">
                    <input v-model="DatosBebe.Altura" max="10" class="input input-expediente" :disabled="!activarForm"
                        type="text" placeholder="">
                    <div class="cut"></div>
                    <label class="placeholder-expediente">Altura del bebé <sub>(cm)</sub></label>
                </div>
            </div>

            <div class="input-container ic1">
                <input v-model="DatosBebe.Sexo" class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label for="firstname" class="placeholder-expediente">Género</label>
            </div>
            <div class="input-container ic1">
                <input v-model="DatosBebe.FechaNacimiento" class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder-expediente">Fecha de Nacimiento</label>
            </div>
            <div class="input-container">
                <input v-model="DatosPadres.Madre" class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder-expediente">Nombre de la Madre</label>
            </div>
            <div class="input-container">
                <input v-model="DatosPadres.Padre" class="input" disabled type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder-expediente">Nombre del Padre</label>
            </div>

            <div class="input-container text-center">
                <button @click="registerBabyForm" v-text="btn" class="submit submit-register pink-background"></button>
            </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            btn: 'Modificar',
            activarForm: false,
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
            padres: {},
            DatosPadres: {
                Padre: '',
                Madre: ''
            },
        }
    },
    methods: {
        actualizarDatos() {
            if (this.btn == 'Modificar') {
                this.btn = 'Confirmar'
                this.activarForm = true
            } else {
                const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/modificarBebe'

                axios.put(url, {
                    IDBebe: this.DatosBebe.IDBebe,
                    Peso: this.DatosBebe.Peso,
                    Altura: this.DatosBebe.Altura,
                    Nombre: this.DatosBebe.Nombre,
                    Sexo: this.DatosBebe.Sexo
                })
                    .then(response => {
                        const msg = response.data;
                        console.log(msg);
                    })
                    .catch(err => {
                        console.error('Error al modificar bebe')
                    })
                this.btn = 'Modificar'
                this.activarForm = false
            }
        },

        obtenerExpediente(id) {
            const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/verExpediente/' + id
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

        obtenerPadres(id) {
            const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/ver-padres/' + id;
            axios.get(url)
                .then(response => {
                    this.padres = response.data;

                    if (this.padres.length > 0) {
                        this.DatosPadres.Padre = this.padres[0].Nombre;
                        if (this.padres.length > 1) {
                            this.DatosPadres.Madre = this.padres[1].Nombre;
                        } else {
                            this.DatosPadres.Madre = '';
                        }
                    } else {
                        // Si no hay padres disponibles, puedes establecer los valores como desees.
                        this.DatosPadres.Padre = '';
                        this.DatosPadres.Madre = '';
                    }
                })
                .catch(err => {
                    console.error('Error al obtener los datos: ' + err);
                });
        }

    },
    mounted() {
        const idBebe = this.$route.params.id;
        this.obtenerExpediente(idBebe)
        this.obtenerPadres(idBebe)
    }
}
</script>

<style></style>