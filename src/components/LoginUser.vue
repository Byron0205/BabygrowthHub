<template>
  <div>
    <div class="c-login">
      <div class="c-login-header">¡Bienvenido de nuevo!</div>
      <div class="c-login-body">
        <form @submit.prevent="login" class="login">
          <div class="input-container ic1">
            <input
              v-model="user.correo"
              class="input"
              type="text"
              placeholder=""
            />
            <div class="cut"></div>
            <label class="placeholder">Correo</label>
          </div>

          <div class="input-container ic1">
            <input
              v-model="user.contrasenna"
              class="input"
              type="password"
              placeholder=""
            />
            <div class="cut"></div>
            <label class="placeholder">Contraseña</label>
          </div>
          <button
            :disabled="!validLogin"
            :class="validLogin ? 'submit' : 'submit-disabled'"
          >
            Iniciar Sesión
          </button>
        </form>

        <div class="divider"></div>
        <p class="text-option">
          ¿No tienes una cuenta?
          <span @click="registerParent" class="option-enlace"
            >¡Creemos una nueva juntos!</span
          >
        </p>

        <!-- <p class="text-option">¿Olvido su contraseña? <span class="option">¡Aquí te ayudamos!</span></p> -->

        <div class="divider"></div>
        <form @submit.prevent="validBabyCode" class="login">
          <p class="text-option">
            Unirse mediante un <span class="option">código</span>
          </p>
          <div class="input-container">
            <input
              v-model="babyCode"
              class="input"
              type="text"
              placeholder=""
            />
          </div>
          <button
            :disabled="!validCodeBaby"
            @click="encargadoForm"
            :class="
              validCodeBaby ? 'submit submit-2' : 'submit-disabled submit-2'
            "
          >
            Unirse mediante Código
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        correo: "",
        contrasenna: "",
      },

      babyCode: "",

      validCodeBaby: false,
      validLogin: false,
    };
  },
  methods: {
    validarCorreo(correo) {
      // Patrón para validar el formato del correo electrónico
      var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Verificar si el correo cumple con el patrón
      return patron.test(correo);
    },
    login() {
      axios
        .post("http://localhost:3000/login", this.user)
        .then((response) => {
          //success response
          let msg = response.data;
          console.log(msg);
          this.enviarToken(this.user.correo);
          this.$router.push("/doble-factor");
        })
        .catch((error) => {
          //error management
          console.error("Error al hacer el login: ", error);
        });
    },
    validBabyCode() {
      if (this.babyCode !== "") {
        this.validCodeBaby = true;
      }
    },
    registerParent() {
      this.$router.push("/registro/1");
    },
    encargadoForm() {
      this.$router.push("/registro/2");
    },

    validarCampos() {
      // Verificar si todos los campos son válidos
      this.validLogin = Object.values(this.user).every((value) => value !== "");
    },
    enviarToken(email) {
      axios
        .get(`http://localhost:3000/enviar-token/${email}/1`)
        .then((response) => {
          // Almacenar el secreto necesario para validar el token
          localStorage.setItem("secreto", JSON.stringify(response.data));
          return response.data;
        })
        .catch((error) => {
          console.error("Error al enviar el token: ", error);
        });
    },
  },
  watch: {
    "user.correo": function (correo) {
      // Validar el campo 'correo'
      if (this.validarCorreo(correo)) {
        // El campo 'correo' tiene un formato válido
        this.validarCampos();
      } else {
        // El campo 'correo' tiene un formato inválido
        this.validLogin = false;
      }
    },
    "user.contrasenna": function (contrasenna) {
      if (contrasenna.length && this.validarCorreo(this.user.correo)) {
        this.validarCampos();
      } else {
        this.validLogin = false;
      }
    },
    babyCode: function (babyCode) {
      if (babyCode.length) {
        this.validBabyCode();
      } else {
        this.validCodeBaby = false;
      }
    },
  },
};
</script>

<style></style>
