<template>
    <div>
        <div class="ultrasonidosTitleContainer">
            <p class="ultrasonidosTitle">
                Celebra la vida desde el principio: Comparte tus ultrasonidos
                del bebé
            </p>
        </div>

        <div>
            <p class="galleryParagraph">
                Desde los primeros latidos del corazón hasta los primeros
                movimientos, cada ultrasonido del bebé es una bendición. En
                nuestra plataforma, puedes compartir y celebrar estos momentos
                preciosos. Comparte la magia de la vida temprana y únete a otros
                padres en esta hermosa experiencia de crecimiento y
                anticipación.
            </p>
        </div>
    </div>

    <div class="gridGallery">
        <div
            v-for="(multi, index) in multimediaData"
            :key="multi.IDMultimedia"
            class="galleryItem galleryContentUltrasonidos"
        >
            <div class="titleMultimedia">
                <p>{{ multi.NombreRecuerdo }}</p>
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
                <p>
                    {{ formatDate(multi.FechaSubida) }}
                </p>
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

        this.obtenerMultimediaEtapas();
    },
};
</script>
