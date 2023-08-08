<template>
    <div class="container">
        <div class="info-container">
            <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Imagen-decoracion.png" alt="">
            <p class="info-text">Sumérgete en un mundo encantador donde las imágenes y videos se convierten en tesoros de
                los momentos más preciosos del crecimiento de tus adorables bebés.
                Comparte en este apartado tus <strong>imagenes y videos</strong> más preciados de tus tesoros!</p>
        </div>
        <div class="form-multi">
            <div class="memory">
                <h2>Nuevo recuerdo</h2>
            </div>
            <label for="new-memory" class="text-label">Nombre Recuerdo</label>
            <input type="text" class="new-memory" v-model="newMemoryName" ref="memoryInput">
            <div class="upload-multi" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop"
                :class="{ 'drag-over': isDragging }">
                <p class="date">{{ formattedDate }}</p>
                <p v-if="uploadedFile" class="drag-text">{{ uploadedFile.name }}</p>
                <p v-else class="drag-text">Arrastre y suelte la imagen / video</p>
                <i v-if="uploadedFile" @click="deleteUploadedFile" class="trash-icon fas fa-trash"
                    style="color: #4F439A;"></i>
            </div>
            <div class="select-container">
                <div class="select-wrapper">
                    <label for="type-multi" class="text-label">Seleccione el álbum destino</label>
                    <select class="type-multi" @change="onAlbumChange" v-model="selectedAlbum">
                        <option value="1">Etapas de desarrollo</option>
                        <option value="2">Ultrasonidos</option>
                    </select>
                </div>
                <div v-if="selectedAlbum !== '2'" class="select-wrapper">
                    <label for="age-baby" class="text-label">Seleccione la etapa para situar el archivo</label>
                    <select class="age-baby" v-model="selectedStage">
                        <option value="0">0 años</option>
                        <option value="1">1 año</option>
                        <option value="2">2 años</option>
                        <option value="3">3 años</option>
                        <option value="4">4 años</option>
                        <option value="5">5 años</option>
                    </select>
                </div>
            </div>
            <label for="sons" class="text-label">Asociar con tu pequeño/a</label>
            <select class="sons">
                <option value="1">Ismael Rosales Mora</option>
                <option value="2">Laura Rosales Mora</option>
            </select>
            <button class="save-multi" @click="uploadFileToServer">Guardar recuerdo</button>
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
            uploadedFile: null,
            selectedAlbum: '1',
            newMemoryName: '',
            selectedStage: '',
        };
    },

    mounted() {
        this.setFormattedDate();
    },

    methods: {
        onAlbumChange() {
            if (this.selectedAlbum === '2') {
                this.selectedStage = '';
            }
        },

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

            const files = event.dataTransfer.files;
            console.log(files);

            if (files.length > 0) {
                this.uploadedFile = files[0];
            }
        },

        deleteUploadedFile() {
            this.uploadedFile = null;
        },

        async uploadFileToServer() {
            try {
                if (!this.uploadedFile) {
                    return;
                }

                const formData = new FormData();
                formData.append('archivo', this.uploadedFile);

                const isImage = this.uploadedFile.type.includes('image');

                const data = {
                    NombreRecuerdo: this.newMemoryName,
                    IDEtapa: this.selectedAlbum === '2' ? null : this.selectedStage,
                    TipoArchivo: isImage ? 'image' : 'video',
                    RutaArchivo: '',
                    IDAlbum: this.selectedAlbum,
                    IDBebe: 17561,
                };

                formData.append('data', JSON.stringify(data));

                const response = await fetch('http://localhost:3000/subir-imagen', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const serverResponse = await response.json();

                data.RutaArchivo = serverResponse.urlS3;
                await this.insertDataToDatabase(data);

                console.log('Data sent to the server:', data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        },

        async insertDataToDatabase(data) {
            try {
                const response = await fetch('http://localhost:3000/subir-multimedia', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Failed to insert data into the database');
                }

                const result = await response.json();
                console.log('Data inserted into the database:', result);
            } catch (error) {
                console.error('Error inserting data into the database:', error);
            }
        },
    },
};
</script>
  
<style lang="scss" scoped></style>
  