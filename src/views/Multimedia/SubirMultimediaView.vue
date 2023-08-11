<template>
    <div class="container">
        <div class="info-container">
            <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Imagen-decoracion.png" class="img-multimedia" alt="">
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
                @click="triggerFileInput" :class="{ 'drag-over': isDragging }">
                <input type="file" class="upload-input" ref="fileInput" @change="onFileChange" style="display: none">
                <p class="date">{{ formattedDate }}</p>
                <p v-if="uploadedFile" class="drag-text">{{ uploadedFile.name }}</p>
                <p v-else class="drag-text">Arrastre imagen (jpg, png), video (mp4) o audio (mp3) o haga clic para elegir archivo.</p>
                <i v-if="uploadedFile" @click="deleteUploadedFile" class="trash-icon fas fa-trash"
                    style="color: #4F439A;"></i>
            </div>
            <div class="select-container">
                <div class="select-wrapper">
                    <label for="type-multi" class="text-label">Seleccione el álbum destino</label>
                    <select class="type-multi" @change="onAlbumChange" v-model="selectedAlbum">
                        <option value="1">Etapas de desarrollo</option>
                        <option value="2">Ultrasonidos</option>
                        <option value="3">Audio</option>
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
            <select class="sons" v-model="selectedChild">
                <option v-for="child in filteredChildren" :key="child.IDBebe" :value="child.IDBebe">
                    {{ child.NombreHijo }} {{ child.ApellidoHijo }}
                </option>
            </select>
            <button class="save-multi" @click="uploadFileToServer">Guardar recuerdo</button>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
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
            children: [],
            selectedChild: null,
        };
    },

    mounted() {
        this.setFormattedDate();
        this.fetchChildren();
    },
    computed: {
        filteredChildren() {
            return this.children.filter(child => child.ROL === "Padre" || child.ROL === "Madre");
        },
    },

    methods: {
        fetchChildren() {
            const idAdulto = localStorage.getItem("idAdulto");

            axios
                .get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/adultos/${idAdulto}`)
                .then((response) => {
                    this.children = response.data.filter((item) => item.IDBebe !== null);
                })
                .catch((error) => {
                    console.error("Error al obtener datos de los hijos:", error);
                });
        },
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

            if (files.length > 0) {
                this.uploadedFile = files[0];
            }
        },
        onFileChange(event) {
        const files = event.target.files;

        if (files.length > 0) {
            const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'audio/mpeg'];
            const selectedFile = files[0];

            if (selectedFile.size > 20 * 1024 * 1024) {
                alert('El archivo es demasiado grande. El tamaño máximo permitido es 20 MB.');
                return;
            }

            if (allowedTypes.includes(selectedFile.type)) {
                this.uploadedFile = selectedFile;
            } else {
                alert('Tipo de archivo no permitido');
            }
        }
    },

        deleteUploadedFile() {
            this.uploadedFile = null;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        async uploadFileToServer() {
            try {
                if (!this.uploadedFile) {
                    return;
                }

                const formData = new FormData();
                formData.append('archivo', this.uploadedFile);

                let fileType = '';
                if (this.uploadedFile.type.includes('image')) {
                    fileType = 'image';
                } else if (this.uploadedFile.type.includes('video')) {
                    fileType = 'video';
                } else if (this.uploadedFile.type.includes('audio')) {
                    fileType = 'audio';
                }

                const data = {
                    NombreRecuerdo: this.newMemoryName,
                    IDEtapa: this.selectedAlbum === '2' ? null : this.selectedStage,
                    TipoArchivo: fileType,
                    RutaArchivo: '',
                    IDAlbum: this.selectedAlbum,
                    IDBebe: 35118,
                };

                formData.append('data', JSON.stringify(data));

                const response = await fetch('https://tiusr3pl.cuc-carrera-ti.ac.cr/subir-imagen', {
                    method: 'POST',
                    body: formData,
                })
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
                const response = await fetch('https://tiusr3pl.cuc-carrera-ti.ac.cr/subir-multimedia', {
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
  