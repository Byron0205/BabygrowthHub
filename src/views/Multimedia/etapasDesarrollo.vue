<template>
    <div>
        <div class="galleryTitle">
            <p>Explora el maravilloso viaje de desarrollo del bebé</p>
        </div>

        <div>
            <p class="galleryParagraph">
                Adéntrate en un mundo de asombro y descubrimiento mientras
                exploras el increíble viaje de desarrollo de tu bebé. Desde los
                primeros balbuceos hasta los logros más sorprendentes, sumérgete
                en esta galería llena de ternura y aprende junto a tu pequeño
                explorador.
            </p>
        </div>
    </div>

    <div class="navbarGallery">
        <div class="ageOptionsContainer">
            <div
                class="ageOption"
                v-for="multimedia in multimediaType"
                :key="index"
                :class="{ selected: selectedMultimediaType === multimedia }"
                @click="selectMultimediaType(multimedia)"
            >
                {{ multimedia }}
            </div>
        </div>
    </div>

    <div class="gridGallery">
        <div
            v-for="(multi, index) in filteredMultimediaType"
            :key="multi.IDMultimedia"
            class="galleryItem galleryContent"
            :style="getSequentialColor(index)"
        >
            <div class="titleMultimedia">
                <p :style="getSequentialColor(index)">
                    {{ multi.NombreRecuerdo }}
                </p>
            </div>
            <div class="galleryMultimediaContainer">
                <img
                    v-if="multi.TipoArchivo === 'image'"
                    class="galleryMultimedia"
                    :src="multi.RutaArchivo"
                    alt="Image"
                />
                <div class="galleryMultimediaContainer">
                    <video
                        v-if="multi.TipoArchivo === 'video'"
                        class="galleryMultimedia"
                        controls
                    >
                        <source :src="multi.RutaArchivo" type="video/mp4" />
                    </video>
                </div>

                <div class="audioMultimediaContainer">
                    <audio v-if="multi.TipoArchivo === 'audio'" controls>
                        <source :src="multi.RutaArchivo" type="audio/mpeg" />
                    </audio>
                </div>
            </div>

            <div class="infoMultimedia">
                <p :style="getSequentialColor(index)">
                    {{ formatDate(multi.FechaSubida) }}
                </p>
                <p :style="getSequentialColor(index)">{{ multi.IDEtapa }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            idAlbum: "",
            idBebe: "",
            multimediaData: [],
            backgroundColors: [
                { background: "#f8f8fd", color: "#796cd0" },
                { background: "#fff3d8", color: "#fcb510" },
                { background: "#fff2f5", color: "#e24a75" },
                { background: "#ffe9dd", color: "#ff6c19" },
            ],
            multimediaData: [],
            multimediaType: ["Todos", "Imágenes", "Videos", "Audios"],
            selectedMultimediaType: "",
            filteredMultimediaType: [],
        };
    },
    methods: {
        checkUserSession() {
            const sessionValue = localStorage.getItem("session");
            if (sessionValue === "0" || sessionValue === undefined) {
                this.$router.push("/login");
            }
        },
        formatDate(date) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        obtenerMultimediaEtapas() {
            const url = `http://localhost:3000/recuperar-multimedia/${this.idBebe}/${this.idAlbum}`;
            axios
                .get(url)
                .then((response) => {
                    console.log(response.data);
                    this.multimediaData = response.data;
                })
                .catch((err) => {
                    console.error("Error al obtener los datos: " + err);
                });
        },
        getSequentialColor(index) {
            const colorIndex = index % this.backgroundColors.length;
            const color = this.backgroundColors[colorIndex];
            return {
                backgroundColor: color.background,
                color: color.color,
            };
        },
        selectMultimediaType(multimedia) {
            this.selectedMultimediaType = multimedia;
            this.filteredMultimediaType = "";
            if (multimedia == "Imágenes") {
                return (this.filteredMultimediaType =
                    this.multimediaData.filter(
                        (multimedia) => multimedia.TipoArchivo === "image"
                    ));
            } else if (multimedia == "Videos") {
                return (this.filteredMultimediaType =
                    this.multimediaData.filter(
                        (multimedia) => multimedia.TipoArchivo === "video"
                    ));
            } else if (multimedia == "Audios") {
                return (this.filteredMultimediaType =
                    this.multimediaData.filter(
                        (multimedia) => multimedia.TipoArchivo === "audio"
                    ));
            } else if (multimedia == "Todos") {
                return (this.filteredMultimediaType = this.multimediaData);
            }
        },
    },
    mounted() {
        this.checkUserSession();
        this.idBebe = this.$route.params.id;
        this.idAlbum = this.$route.params.idAlbum;

        console.log(`${this.idBebe} | ${this.idAlbum}`);

        this.obtenerMultimediaEtapas();
    },
};
</script>
