<template>
  <div class="viewMedicalData">
    <p class="description-MedicalData">
      Selecciona alguna de las siguientes opciones para poder ver los datos
    </p>
    <div class="select-Data">
      <button
        class="button-expediente diagnositoco"
        @click="obtenerDiagnosticos(this.idBebe)"
      >
        Diagnósticos médicos
      </button>
      <button
        class="button-expediente alergias"
        @click="obtenerAlergias(this.idBebe)"
      >
        Alergias registrados
      </button>
    </div>
    <div class="data-view-list">
      <div class="view-item" v-for="item in Padecimientos" :key="item.id">
        <div class="text-item">
          <i class="fa-solid fa-align-left icon-text"></i>
          <p class="text-item-style">{{ item.Padecimiento }}</p>
        </div>
        <i
          class="fa-solid fa-trash icon-trash"
          @click="deleteDiagnostico(item.id, item.type)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { id } from "date-fns/locale";
export default {
  data() {
    return {
      Padecimientos: [],
      Diagnosticos: [],
      Alergias: [],
      idbebe: "",
      message: "",
      alertType: "",
    };
  },
  methods: {
    deleteDiagnostico(id, type) {
      if (type == "diagnostico") {
        const url = "http://localhost:3000/eliminar-diagnostico/" + id;
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              this.message = "¡Diagnostico eliminado exitosamente!";
              this.alertType = "success";
              this.showAlert();
              this.$router.push(`/expediente/salud/${this.idbebe}`);
            } else {
              this.message = "¡Ha ocurrido al eliminar la diagnostico!";
              this.alertType = "error";
              this.showAlert();
            }
          })
          .catch((err) => {
            console.error("Error al obtener los datos: " + err);
          });
      } else {
        const url = "http://localhost:3000/eliminar-alergia/" + id;
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              this.message = "¡Alergia eliminada exitosamente!";
              this.alertType = "success";
              this.showAlert();
              this.$router.push(`/expediente/salud/${this.idbebe}`);
            } else {
              this.message = "¡Ha ocurrido al eliminar la alergia!";
              this.alertType = "error";
              this.showAlert();
            }
          })
          .catch((err) => {
            console.error("Error al obtener los datos: " + err);
          });
      }
    },
    obtenerDiagnosticos(id) {
      console.log(id);
      this.Diagnosticos = [];
      this.Padecimientos = [];
      const url = "http://localhost:3000/verDiagnosticos/" + id;
      axios
        .get(url)
        .then((response) => {
          this.Diagnosticos = response.data;
          this.Padecimientos = this.Diagnosticos.map((diagnostico) => ({
            ...diagnostico,
            type: "diagnostico",
          }));
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    obtenerAlergias(id) {
      this.Alergias = [];
      this.Padecimientos = [];
      const url = "http://localhost:3000/verAlergias/" + id;
      axios
        .get(url)
        .then((response) => {
          this.Alergias = response.data;
          this.Padecimientos = this.Alergias.map((alergia) => ({
            ...alergia,
            type: "alergia",
          }));
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
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
  mounted() {
    console.log(this.$route.params.id);
    this.idBebe = this.$route.params.id;
  },
};
</script>

<style scoped>
.icon-text {
  color: #0f5b8e;
  margin-top: 1.5rem;
}
</style>
