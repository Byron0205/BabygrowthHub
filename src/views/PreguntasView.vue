<template>
  <div class="titleContainer">
    <p>Consejería Infantil: Tu Compañero de Crianza Virtual</p>
  </div>

  <div class="flexViewQuestions">
    <div class="flexItem">
      <img
        class="imgQuestions"
        src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/Advertencia+sobre+uso+de+IA.png"
        alt="Advertencia uso IA"
      />
    </div>
    <div class="flexItem">
      <div class="formQuestionsContainer">
        <div class="inputContainer">
          <input type="text" class="input" v-model="question" />
          <div class="cut"></div>
          <label class="placeholderQuestion">Escribe una pregunta</label>
        </div>
        <br />
        <div>
          <button class="btnAskQuestion" @click="askQuestion">PREGUNTAR</button>
        </div>
        <br />
        <div class="inputContainer">
          <textarea
            class="input textarea"
            readonly="true"
            v-model="response"
          ></textarea>
          <label class="placeholderQuestion">Respuesta Obtenida</label>
        </div>
      </div>
    </div>
  </div>
  <div v-if="message" class="alert" :class="alertType">
    {{ message }}
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      question: "",
      message: "",
      alertType: "",
      response: "",
    };
  },
  mounted() {
    this.checkUserSession();
    if (localStorage.getItem("session") !== "1") {
      this.$router.push("/login");
    }
  },
  methods: {
    checkUserSession() {
      const sessionValue = localStorage.getItem("session");
      if (sessionValue === "0" || sessionValue === undefined) {
        this.$router.push("/login");
      }
    },
    askQuestion() {
      this.response = "";
      const questionData = {
        question: this.question,
      };

      axios
        .post("https://tiusr3pl.cuc-carrera-ti.ac.cr/preguntar-chat", questionData)
        .then((response) => {
          let msg = response.data;
          if (msg.response) {
            this.response = msg.response;
          } else {
            this.message = "Ha ocurrido un error al procesar la pregunta!";
            this.alertType = "error";
            this.showAlert();
          }
        })
        .catch((error) => {
          console.error("Error al realizar la pregunta: ", error);
        });
    },
    showAlert() {
      const displayDuration = 3000;

      setTimeout(() => {
        this.message = "";
        this.alertType = "";
      }, displayDuration);
    },
  },
};
</script>
