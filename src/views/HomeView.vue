<template>
  <!-- Mensaje bienvenida -->
  <div class="home-flex-container">
    <div class="home-text">
      <div class="home-decoracion">
        <img
          class="home-nave-espacial"
          src="../assets/img/Decoracion-nave-espacial.png"
          alt="Decoracion nave espacial"
        />
      </div>
      <p class="home-logo">
        ¡Bienvenido a <span class="home-blue-text">BabyGrowthHub</span>!
      </p>
      <p class="home-parrafo">
        Te ofrecemos una amplia gama de servicios diseñados para ayudarte a
        cuidar y mantener a tu pequeño tesoro feliz y saludable. Nos enorgullece
        brindarte una experiencia sencilla, intuitiva y agradable mientras te
        acompañamos en esta hermosa etapa de la vida. ¡Únete a nosotros y
        descubre cómo hacer el cuidado de tu bebé más fácil y emocionante que
        nunca!A contuación enlaces de interes:
      </p>

      <!-- Queda pendiente modificar los enlaces -->
      <div class="home-container-enlaces">
        <a class="home-enlace" href="#">Consejos</a>
        <a class="home-enlace" href="#">Nombres & Significados</a>
        <a class="home-enlace" href="#">Acerca De</a>
      </div>
    </div>

    <div class="home-img-container">
      <img
        class="home-img"
        src="../assets/img/Home-image-01.png"
        alt="Niños jugando"
      />
    </div>
  </div>

  <!-- 'NS' = Nombres y significados -->
  <div class="NS-flex-container">
    <div class="NS-img-container">
      <img
        class="NS-img"
        src="../assets/img/Home-image-02.png"
        alt="Niños jugando"
      />
    </div>
    <div class="NS-text">
      <p class="NS-titulo">Nombres & Significados</p>
      <p class="NS-parrafo">
        ¡Descubre el significado detrás de cada nombre de bebé con nuestro
        buscador especializado! Simplemente ingresa el nombre que deseas
        explorar y haz clic en el botón de búsqueda
      </p>
      <div class="NS-buscar-container">
        <input type="text" class="NS-input" />
        <button class="NS-button">
          <i class="fa-solid fa-magnifying-glass NS-icon"></i>
        </button>
      </div>

      <!-- Ocultar y mostrar segun sea necesario -->
      <div id="ResultadoSignificado" class="NS-resultado-container">
        <p class="NS-resultado" id="Resultado">
          {{ resultadoSignificado }}
        </p>
      </div>

      <div class="home-decoracion">
        <img
          class="home-oso"
          src="../assets/img/Decoracion-oso.png"
          alt="Decoracion osito de peluche"
        />
      </div>
    </div>
  </div>

  <!-- Slider consejos -->
  <div>
    <div class="home-decoracion">
        <img
          class="home-sol"
          src="../assets/img/Decoracion-sol.png"
          alt="Decoracion osito de peluche"
        />
      </div>
    <SliderConsejos />
  </div>
</template>

<script>
import SliderConsejos from "../components/SliderConsejos.vue";
export default {
  data() {
    return {
      resultadoSignificado:
        "El nombre Brian tiene origen celta y su significado es 'fuerte' o 'poderoso'. Proviene de la palabra irlandesa 'Brígh' que significa 'fuerza' o 'virtud'.",
    };
  },
  components: {
    SliderConsejos,
  },
};
</script>
