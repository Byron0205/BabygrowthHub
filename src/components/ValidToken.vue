<template>
  <div>
    <div class="c-login">
      <div class="c-login-header">Autenticación de doble factor</div>
      <div class="c-login-body">
        <form @submit.prevent="validateEnterToken" class="login">
          <div class="input-container ic1">
            <input v-model="token" maxlength="6" @input="validarNumeros" class="input" type="text" placeholder="" />
            <div class="cut"></div>
            <label class="placeholder">Token</label>
          </div>

          <button :disabled="!validToken" :class="validToken ? 'submit' : 'submit-disabled'">
            Validar Token
          </button>
        </form>
      </div>
      <div v-if="message" class="alert" :class="alertType">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      validToken: false,
      message: "",
      alertType: "",
    };
  },
  methods: {
    validateEnterToken() {
      const secretoString = localStorage.getItem("secreto");
      const secretoObj = JSON.parse(secretoString);

      const datosToken = {
        token: this.token,
        secreto: secretoObj,
      };

      axios
        .post("https://tiusr3pl.cuc-carrera-ti.ac.cr/validar-token", datosToken)
        .then((response) => {
          let msg = response.data;
          if (msg.isValidToken) {
            localStorage.removeItem("secreto");
            localStorage.setItem("session", "1");
            this.$router.push("/inicio");
          } else {
            this.message = "Token invalido, inténtalo de nuevo!";
            this.alertType = "error";
            this.showAlert();
          }
        })
        .catch((error) => {
          //error management
          console.error("Error al hacer el login: ", error);
        });
    },

    validarNumeros() {
      if (!this.validNumeros) {
        // Si el usuario ingresó un valor no numérico, actualizamos la variable para que contenga solo números
        this.token = this.token.replace(/[^\d]/g, "");
      }
    },

    showAlert() {
      const displayDuration = 3000;

      setTimeout(() => {
        this.message = "";
        this.alertType = "";
      }, displayDuration);
    },
  },
  computed:{
    validNumeros() {
      return /^\d*$/.test(this.token);
    },
  }
};
</script>

<style></style>
