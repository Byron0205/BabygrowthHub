<template>
    <div class="viewMedicalData-Medicamentos">
        <div class="header-medicacion">
            <p class="title-medicacion">Medicamentos recetados</p>
        </div>
        <div class="data-view-medicamentos">
            <div class="view-item" v-for="item in ListMedicamentos" :key="item">
                <div class="text-item">
                    <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-texto.svg" alt="icon">
                    <p class="text-item-style">{{ item.Nombre}}</p>
                </div>
                <!-- <img class="icon-trash" @click="deleteDiagnostico(item.id)" src="../assets/img/icono-trash.svg"
                    alt="icon trash"> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            ListMedicamentos: [],
            Medicamentos: [],
            Vacunas: []
        }
    },
    methods: {
        deleteDiagnostico(id) {
            this.diagnosticos = this.diagnosticos.filter(elemento => elemento.id !== id);
        },
        obtenerMedicamentos(id) {
            const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/verMedicamentos/' + id
            axios.get(url)
                .then(response => {
                    this.Medicamentos = response.data;
                    this.ListMedicamentos.push(...this.Medicamentos)
                })
                .catch(err => {
                    console.error('Error al obtener los datos: ' + err)
                })
        },
        obtenerVacunas(id) {
            const url = 'https://tiusr3pl.cuc-carrera-ti.ac.cr/verVacunas/' + id
            axios.get(url)
                .then(response => {
                    this.Vacunas = response.data;
                    this.ListMedicamentos.push(...this.Vacunas)
                })
                .catch(err => {
                    console.error('Error al obtener los datos: ' + err)
                })
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
    },
    mounted() {
        const idBebe = this.$route.params.id;
        this.obtenerMedicamentos(idBebe)
        this.obtenerVacunas(idBebe)
    }
}
</script>

<style scoped>
/* Estilo para ocultar los radios por defecto */
input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

/* Estilo para las etiquetas de los radios */
label {
    display: inline-block;
    padding: 10px 20px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    cursor: pointer;
}

.radio-option {
    width: 100%;
    text-align: center;
    font-family: 'Baloo 2';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 15px;
}

.select-Data>.radio-option:nth-of-type(1) {
    background-color: #DAEFFE;
    color: #479DD8;
}

/* .select-Data>.radio-option:nth-of-type(2) {
    background-color: #FBE6C2;
    color: #E89811;
} */

.select-Data>.radio-option:nth-of-type(2) {
    background-color: #F4D2DE;
    color: #E4547D;
}


/* Estilo para la etiqueta cuando el radio está seleccionado */
input[type="radio"]:checked+label {
    border: 2px dashed black;
}
</style>