<template>
  <div>
    <div class="galleryTitle">
      <p>
        Revive los momentos mágicos año tras año en nuestro Álbum Fotográfico
      </p>
    </div>

    <div>
      <p class="galleryParagraph">
        Déjate envolver por la nostalgia y la alegría al revivir los momentos
        más mágicos de tu bebé a lo largo de los años. En nuestro Álbum
        Fotográfico, cada imagen es una ventana al pasado, donde podrás revivir
        sonrisas, abrazos y aventuras. Celebra el crecimiento de tu tesoro y
        disfruta de un recorrido lleno de amor y dulces recuerdos.
      </p>
    </div>
  </div>

  <div class="selectGalleryYearContainer">
    <select v-model="selectedYear" class="selectGalleryYear">
      <option value="">Todos los años</option>
      <option v-for="year in uniqueYears" :value="year" :key="year">{{ year }}</option>
    </select>
  </div>

  <div class="gridGallery">
    <div
      v-for="multi in filteredImages"
      :key="multi.IDMultimedia"
      class="galleryItem galleryItemColor galleryContent"
    >
      <div class="titleMultimedia">
        <p class="galleryItemColor">{{ multi.NombreRecuerdo }}</p>
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
        <p class="galleryItemColor">
          {{ formatDate(multi.FechaSubida) }}
        </p>
        <p class="galleryItemColor">{{ multi.IDEtapa }}</p>
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
      groupedData: {},
      selectedYear: ""
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
      const url = `https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-multimedia/${this.idBebe}/${this.idAlbum}`;
      axios
        .get(url)
        .then((response) => {
          this.multimediaData = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
  },
  computed: {
    uniqueYears() {
      const years = this.multimediaData.map(image => new Date(image.FechaSubida).getFullYear());
      return [...new Set(years)];
    },
    filteredImages() {
      if (this.selectedYear) {
        return this.multimediaData.filter(image => new Date(image.FechaSubida).getFullYear() === parseInt(this.selectedYear));
      } else {
        return this.multimediaData;
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
