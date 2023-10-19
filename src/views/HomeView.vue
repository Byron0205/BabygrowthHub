<template>
    <!-- Mensaje bienvenida -->
    <div class="homeFlexContainer">
        <div class="homeText">
            <div class="homeDecoration">
                <img
                    class="homeSpaceship"
                    src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/decoracion-espacio.svg"
                    alt="Decoracion nave espacial"
                />
            </div>
            <p class="homeLogo">
                ¡Bienvenido a <span class="homeBlueText">BabyGrowthHub</span>!
            </p>
            <p class="homeParagraph">
                Te ofrecemos una amplia gama de servicios diseñados para
                ayudarte a cuidar y mantener a tu pequeño tesoro feliz y
                saludable. Nos enorgullece brindarte una experiencia sencilla,
                intuitiva y agradable mientras te acompañamos en esta hermosa
                etapa de la vida. ¡Únete a nosotros y descubre cómo hacer el
                cuidado de tu bebé más fácil y emocionante que nunca!A
                contuación enlaces de interes:
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
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/ni%C3%B1os-jugando.svg"
                alt="Niños jugando"
            />
        </div>
    </div>

    <!-- 'NS' = Nombres y significados -->
    <div class="NSflexContainer" id="nombres">
        <div class="NSImgContainer">
            <img
                class="NSImg"
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/ni%C3%B1a-jugando.svg"
                alt="Niños jugando"
            />
        </div>
        <div class="NSText">
            <p class="NSTitle">Nombres & Significados</p>
            <p class="NSParagraph">
                ¡Descubre el significado detrás de cada nombre de bebé con
                nuestro buscador especializado! Simplemente ingresa el nombre
                que deseas explorar y haz clic en el botón de búsqueda
            </p>
            <div class="NSSearchContainer">
                <input type="text" class="NSInput" ref="nameInput" />
                <button class="NSButton" @click="searchMeaning">
                    <i class="fa-solid fa-magnifying-glass NSIcon"></i>
                </button>
            </div>

            <!-- Ocultar y mostrar segun sea necesario -->
            <div id="ResultMeaning" class="NSResultContainer">
                <p class="NSResult" id="Result">
                    {{ resultMeaning }}
                </p>
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
import axios from "axios";
export default {
    data() {
        return {
            nombres_significados: [],
            resultMeaning: "",
        };
    },
    components: {
        SliderConsejos,
    },
    methods: {
        getNombresSignificados() {
            axios
                .get(`http://localhost:3000/recuperar-nombres-significados`)
                .then((response) => {
                    this.nombres_significados = response.data;
                })
                .catch((error) => {
                    console.error("Error al obtener los datos:", error);
                });
        },
        searchMeaning() {
            const name = this.$refs.nameInput.value;
            const foundName = this.nombres_significados.find(
                (item) => item.nombre.toLowerCase() === name.toLowerCase()
            );
            if (foundName) {
                this.resultMeaning = foundName.significado;
            } else {
                this.resultMeaning =
                    "Nombre no encontrado en la base de datos :(";
            }
        },
    },
    mounted() {
        this.getNombresSignificados();
    },
};
</script>
