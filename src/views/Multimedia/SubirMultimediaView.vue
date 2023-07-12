<template>
    <div>
        <div class="img-container">
            <img src="../../assets/img/Imagen-decoracion.png" alt="">
            <p class="info-text">Sumérgete en un mundo encantador donde las imágenes y
                videos se convierten en tesoros de los momentos más
                preciosos del crecimiento de tus adorables bebés.
                Comparte en este apartado tus <strong>imagenes y videos</strong> más presiados de tus tesoros!</p>
        </div>
        <div class="form-multi">
            <label for="new-memory" class="text-label">Nombre Recuerdo</label>
            <input type="text" class="new-memory">
            <div class="upload-multi" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop"
                :class="{ 'drag-over': isDragging }">
                <p class="date">{{ formattedDate }}</p>
                
                <!-- Mostrar el nombre del archivo subido -->
                <p v-if="uploadedFile" class="drag-text">{{ uploadedFile.name }}</p>
                <p v-else class="drag-text">Arrastre y suelte la imagen / video a subir aquí</p>
                
                <!-- Mostrar el icono del basurero y permitir eliminar el archivo -->
                <i v-if="uploadedFile" @click="deleteUploadedFile" class="trash-icon fas fa-trash" style="color: #4F439A;"></i>
            </div>
            <label for="type-multi" class="text-label">Seleccione el álmum destino</label>
            <select class="type-multi">
                <option value="etapas">Etapas de desarrollo</option>
                <option value="ultrasonidos">Ultrasonidos</option>
            </select>
            <label for="age-baby" class="text-label">Seleccione el álmum destino</label>
            <select class="age-baby">
                <option value="0">0 años</option>
                <option value="1">1 año</option>
                <option value="2">2 años</option>
                <option value="3">3 años</option>
                <option value="4">4 años</option>
                <option value="5">5 años</option>
            </select>
            <label for="sons" class="text-label">Asociar con tu pequeño/a</label>
            <select class="sons">
                <option value="1">Ismael Rosales Mora</option>
                <option value="2">Laura Rosales Mora</option>
            </select>
            <button class="save-multi">Guardar recuerdo</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BabygrowthHubSubirMultimediaView',

    data() {
        return {
            isDragging: false,
            formattedDate: '',
            uploadedFile: null // Variable para almacenar el archivo subido
        };
    },

    mounted() {
        this.setFormattedDate();
    },

    methods: {
        setFormattedDate() {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date();
            this.formattedDate = today.toLocaleDateString('es-ES', options);
        },

        onDragOver(event) {
            event.preventDefault();
            this.isDragging = true;
        },

        onDragLeave(event) {
            event.preventDefault();
            this.isDragging = false;
        },

        onDrop(event) {
            event.preventDefault();
            this.isDragging = false;
            
            // Manejar el archivo(s) subido aquí
            const files = event.dataTransfer.files;
            console.log(files);

            if (files.length > 0) {
                // Guardar el primer archivo subido
                this.uploadedFile = files[0];
                // También puedes acceder a otras propiedades del archivo, como el tamaño (uploadedFile.size), tipo (uploadedFile.type), etc.
            }
        },

        deleteUploadedFile() {
            this.uploadedFile = null;
        }
    },
};
</script>

<style lang="scss" scoped></style>