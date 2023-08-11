<template>
  <div class="flexViewGallery">
    <div class="flexGalleryItem">
      <img
        class="imgQuestions"
        src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Imagen-decoracion.png"
        alt="Advertencia uso IA"
      />
    </div>
    <div class="flexGalleryItem">
      <div>
        <p class="titleGallery">Galería Recuerdos de <span style="color: #ff6c19;"> {{ nombreBebe }} </span></p>
      </div>

      <div class="flexAlbumsContainer">
        <div class="flexColumGallery">
          <div>
            <button class="btnAlbum albumeEtapaDesarrollo" @click="etapasDesarrollo(this.idBebe, 1)">
              Etapas del desarrollo
            </button>
          </div>
          <div>
            <button class="btnAlbum albumPorAnio">Álbum por año</button>
          </div>
        </div>

        <div class="flexColumGallery">
          <button class="btnAlbum albumUltrasonidos">Ultrasonidos</button>
        </div>

        <div class="flexColumGallery">
          <div>
            <button class="btnAlbum subirVideoFoto">Subir foto/video</button>
          </div>
          <div>
            <button class="btnAlbum subirAudio">Grabar Audio</button>
          </div>
        </div>
      </div>

      <div>
        <p class="galleryParagraph">
          ¡Adéntrate en la encantadora Galería de Recuerdos! Aquí, las imágenes,
          audios y videos capturan los preciosos momentos del crecimiento de
          nuestros adorables bebés. Sumérgete en este tesoro de recuerdos y
          revive con alegría cada instante inolvidable. ¡Disfruta de la magia
          que se despliega en cada clic y crea memorias para toda la vida!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idBebe: "",
      nombreBebe: "",
    };
  },
  methods: {
    checkUserSession() {
      const sessionValue = localStorage.getItem("session");
      if (sessionValue === "0" || sessionValue === undefined) {
        this.$router.push("/login");
      }
    },
    etapasDesarrollo(idBebe, idAlbum){
      this.$router.push(`/album-etapas-desarrollo/${idBebe}/${idAlbum}`);
    }
  },
  mounted() {
    this.checkUserSession();
    this.idBebe = this.$route.params.id;
    this.nombreBebe = this.$route.params.nombreBebe;
  },
};
</script>
