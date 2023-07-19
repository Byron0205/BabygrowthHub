<template>
  <!-- Mensaje bienvenida -->
  <div class="homeFlexContainer">
    <div class="homeText">
      <div class="homeDecoration">
        <img
          class="homeSpaceship"
          src="../assets/img/Decoracion-nave-espacial.png"
          alt="Decoracion nave espacial"
        />
      </div>
      <p class="homeLogo">
        ¡Bienvenido a <span class="homeBlueText">BabyGrowthHub</span>!
      </p>
      <p class="homeParagraph">
        Te ofrecemos una amplia gama de servicios diseñados para ayudarte a
        cuidar y mantener a tu pequeño tesoro feliz y saludable. Nos enorgullece
        brindarte una experiencia sencilla, intuitiva y agradable mientras te
        acompañamos en esta hermosa etapa de la vida. ¡Únete a nosotros y
        descubre cómo hacer el cuidado de tu bebé más fácil y emocionante que
        nunca!A contuación enlaces de interes:
      </p>

      <!-- Queda pendiente modificar los enlaces -->
      <div class="homeContainerLinks">
        <a class="homeLink" href="#consejos">Consejos</a>
        <a class="homeLink" href="#nombres">Nombres & Significados</a>
        <a class="homeLink" href="#">Acerca De</a>
      </div>
    </div>

    <div class="homeImgContainer">
      <img
        class="homeImg"
        src="../assets/img/Home-image-01.png"
        alt="Niños jugando"
      />
    </div>
  </div>

  <!-- 'NS' = Nombres y significados -->
  <div class="NSflexContainer" id="nombres">
    <div class="NSImgContainer">
      <img
        class="NSImg"
        src="../assets/img/Home-image-02.png"
        alt="Niños jugando"
      />
    </div>
    <div class="NSText">
      <p class="NSTitle">Nombres & Significados</p>
      <p class="NSParagraph">
        ¡Descubre el significado detrás de cada nombre de bebé con nuestro
        buscador especializado! Simplemente ingresa el nombre que deseas
        explorar y haz clic en el botón de búsqueda
      </p>
      <div class="NSSearchContainer">
        <input type="text" class="NSInput" />
        <button class="NSButton">
          <i class="fa-solid fa-magnifying-glass NSIcon"></i>
        </button>
      </div>

      <!-- Ocultar y mostrar segun sea necesario -->
      <div id="ResultMeaning" class="NSResultContainer">
        <p class="NSResult" id="Result">
          {{ resultMeaning }}
        </p>
      </div>

      <div class="homeDecoration">
        <img
          class="homeBear"
          src="../assets/img/Decoracion-oso.png"
          alt="Decoracion osito de peluche"
        />
      </div>
    </div>
  </div>

  <!-- Slider consejos -->
  <div id="consejos">
    <SliderConsejos />
  </div>
</template>

<script>
import SliderConsejos from "../components/SliderConsejos.vue";
export default {
  data() {
    return {
      resultMeaning:
        "El nombre Brian tiene origen celta y su significado es 'fuerte' o 'poderoso'. Proviene de la palabra irlandesa 'Brígh' que significa 'fuerza' o 'virtud'.",
    };
  },
  components: {
    SliderConsejos,
  },
};
</script>
