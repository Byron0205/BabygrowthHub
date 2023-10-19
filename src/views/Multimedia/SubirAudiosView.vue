<template>
    <div class="container">
        <div class="info-container">
            <img
                src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/ImagenAudio.png"
                class="img-multimedia"
                alt=""
            />
            <p class="info-text-audio">
                Disfruta de la magia que se despliega al compartir y guardar
                <strong>tus audios más preciados. </strong> Cada nota, risa o
                canción se convertirá en una memoria atesorada para toda la
                vida, que podrás compartir con tus seres queridos y disfrutar
                una y otra vez.
            </p>
        </div>
        <div class="form-multi-audio">
            <div class="memory-audio">
                <h2>Nuevo recuerdo</h2>
            </div>
            <label for="new-memory" class="text-label">Nombre Recuerdo</label>
            <input
                type="text"
                class="new-memory"
                v-model="newMemoryName"
                ref="memoryInput"
            />
            <div class="upload-multi" :class="{ 'drag-over': isDragging }">
                <audio ref="audioPlayer" controls></audio>
                <i
                    v-if="!isRecording"
                    class="record-icon fas fa-microphone"
                    style="color: #fa5d3b; font-size: 20px"
                    @click="startRecording"
                ></i>
                <i
                    v-if="isRecording"
                    class="stop-icon fas fa-stop-circle"
                    style="color: #fa5d3b; font-size: 20px"
                    @click="stopRecording"
                ></i>
                <i
                    v-if="showDeleteIcon"
                    class="trash-icon fas fa-trash"
                    style="color: #fa5d3b; font-size: 20px"
                    @click.stop="deleteAudioRecording"
                ></i>
            </div>
            <div class="select-container">
                <div class="select-wrapper">
                    <label for="type-multi" class="text-label"
                        >Seleccione el álbum destino</label
                    >
                    <select
                        class="type-multi-audio"
                        @change="onAlbumChange"
                        v-model="selectedAlbum"
                    >
                        <option value="1">Etapas de desarrollo</option>
                        <option value="3">Audio</option>
                    </select>
                </div>
                <div v-if="selectedAlbum !== '2'" class="select-wrapper">
                    <label for="age-baby" class="text-label"
                        >Seleccione la etapa para situar el archivo</label
                    >
                    <select class="age-baby-audio" v-model="selectedStage">
                        <option value="0">0 años</option>
                        <option value="1">1 año</option>
                        <option value="2">2 años</option>
                        <option value="3">3 años</option>
                        <option value="4">4 años</option>
                        <option value="5">5 años</option>
                    </select>
                </div>
            </div>
            <label for="sons" class="text-label"
                >Asociar con tu pequeño/a</label
            >
            <select class="sons-audio" v-model="selectedChild">
                <option
                    v-for="child in filteredChildren"
                    :key="child.IDBebe"
                    :value="child.IDBebe"
                >
                    {{ child.NombreHijo }} {{ child.ApellidoHijo }}
                </option>
            </select>
            <button class="save-multi-audio" @click="uploadFileToServer">
                Guardar recuerdo
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "BabygrowthHubSubirMultimediaView",

    data() {
        return {
            isDragging: false,
            formattedDate: "",
            uploadedFile: null,
            selectedAlbum: "1",
            newMemoryName: "",
            selectedStage: "",
            children: [],
            selectedChild: null,
            isRecording: false,
            mediaRecorder: null,
            audioRecording: null,
            showDeleteIcon: false,
        };
    },

    mounted() {
        this.setFormattedDate();
        this.fetchChildren();
    },
    computed: {
        filteredChildren() {
            return this.children.filter(
                (child) => child.ROL === "Padre" || child.ROL === "Madre"
            );
        },
    },

    methods: {
        async startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                this.mediaRecorder = new MediaRecorder(stream);

                const chunks = [];
                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks, { type: "audio/mpeg" });
                    const randomName = `${Math.random()
                        .toString(36)
                        .substring(7)}.mp3`;
                    this.audioRecording = new File([audioBlob], randomName, {
                        type: "audio/mpeg",
                    });

                    stream.getTracks().forEach((track) => track.stop());
                    this.showDeleteIcon = true;
                    this.$refs.audioPlayer.src = URL.createObjectURL(audioBlob);
                    this.$refs.audioPlayer.play();
                };

                this.mediaRecorder.start();
                this.isRecording = true;
                this.showDeleteIcon = false;
            } catch (error) {
                console.error("Error al iniciar la grabación de audio:", error);
            }
        },
        stopRecording() {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
                this.isRecording = false;
                this.$refs.audioPlayer.pause();
            }
        },
        deleteAudioRecording() {
            this.audioRecording = null;
            this.$refs.audioPlayer.pause();
            this.$refs.audioPlayer.currentTime = 0;
            this.showDeleteIcon = false;
        },

        fetchChildren() {
            const idAdulto = localStorage.getItem("idAdulto");

            axios
                .get(`http://localhost:3000/adultos/${idAdulto}`)
                .then((response) => {
                    this.children = response.data.filter(
                        (item) => item.IDBebe !== null
                    );
                })
                .catch((error) => {
                    console.error(
                        "Error al obtener datos de los hijos:",
                        error
                    );
                });
        },
        onAlbumChange() {
            if (this.selectedAlbum === "2") {
                this.selectedStage = "";
            }
        },

        setFormattedDate() {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            const today = new Date();
            this.formattedDate = today.toLocaleDateString("es-ES", options);
        },

        deleteUploadedFile() {
            this.uploadedFile = null;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        async uploadFileToServer() {
            try {
                if (!this.audioRecording) {
                    return;
                }

                const formData = new FormData();
                formData.append("archivo", this.audioRecording);
                const data = {
                    NombreRecuerdo: this.newMemoryName,
                    IDEtapa:
                        this.selectedAlbum === "2" ? null : this.selectedStage,
                    TipoArchivo: "audio",
                    RutaArchivo: "",
                    IDAlbum: this.selectedAlbum,
                    IDBebe: this.selectedChild,
                };
                console.log("FormData contents:", formData);

                formData.append("data", JSON.stringify(data));

                const response = await fetch(
                    "http://localhost:3000/subir-imagen",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                const serverResponse = await response.json();

                data.RutaArchivo = serverResponse.urlS3;
                await this.insertDataToDatabase(data);

                console.log("Data sent to the server:", data);

                this.$router.push("/perfil");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        },

        async insertDataToDatabase(data) {
            try {
                const response = await fetch(
                    "http://localhost:3000/subir-multimedia",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to insert data into the database");
                }

                const result = await response.json();
                console.log("Data inserted into the database:", result);
            } catch (error) {
                console.error("Error inserting data into the database:", error);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
