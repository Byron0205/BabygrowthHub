<template>
  <div class="image-grid">
    <div v-for="image in multimediaData" :key="image.IDMultimedia" class="image-item">
      <img :src="image.RutaArchivo" alt="Image">
      <div class="image-info">
        <p>{{ image.NombreRecuerdo }}</p>
        <p>{{ formatDate(image.FechaSubida) }}</p>
        <p>{{ image.IDEtapa }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      idAlbum:"",
      idBebe:"",
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
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    obtenerMultimediaEtapas(){
      const url = `http://localhost:3000/recuperar-multimedia/${this.idBebe}/${this.idAlbum}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data)
          this.multimediaData = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    }
  },
  mounted() {
    this.checkUserSession();
    this.idBebe = this.$route.params.id;
    this.idAlbum = this.$route.params.idAlbum;

    console.log(`${this.idBebe} | ${this.idAlbum}`)

    this.obtenerMultimediaEtapas();
  }
};
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.image-item {
  position: relative;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
}
</style>
