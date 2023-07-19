<template>
    <div class="viewMedicalData">
        <p class="description-MedicalData">
            Selecciona alguna de las siguientes opciones para poder ver los datos
        </p>
        <div class="select-Data">
            <input type="radio" id="diagnosticos" name="opciones" value="opcion1">
            <label for="diagnosticos" class="radio-option">Diagnósticos médicos</label>

            <input type="radio" id="padecimientos" name="opciones" value="opcion3">
            <label for="padecimientos" class="radio-option">Padecimientos registrados</label>
        </div>
        <div class="data-view-list">
            <div class="view-item" v-for="item in diagnosticos" :key="item.id">
                <div class="text-item">
                    <img src="../assets/img/icono-texto.svg" alt="icon">
                    <p class="text-item-style">{{ item.diagnostico }}</p>
                </div>
                <img class="icon-trash" @click="deleteDiagnostico(item.id)" src="../assets/img/icono-trash.svg"
                    alt="icon trash">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diagnosticos: [
                { diagnostico: 'Dermatitis del pañal', id: 1 },
                { diagnostico: 'Cólicos del lactante', id: 2 },
                { diagnostico: "Infecciones del tracto respiratorio superior", id: 3 },
                { diagnostico: 'Dermatitis del pañal', id: 4 },
                { diagnostico: 'Cólicos del lactante', id: 5 },
                { diagnostico: "Infecciones del tracto respiratorio superior", id: 6 },
                { diagnostico: 'Dermatitis del pañal', id: 7 },
                { diagnostico: 'Cólicos del lactante', id: 8 },
                { diagnostico: "Infecciones del tracto respiratorio superior", id: 9 }
            ]
        }
    },
    methods: {
        deleteDiagnostico(id) {
            this.diagnosticos = this.diagnosticos.filter(elemento => elemento.id !== id);
        }
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