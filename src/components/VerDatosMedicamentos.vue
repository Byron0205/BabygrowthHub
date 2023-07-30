<template>
  <div class="viewMedicalData">
    <p class="description-MedicalData">
      Selecciona alguna de las siguientes opciones para poder ver los datos
    </p>
    <div class="select-Data">
      <div style="display: flex">
        <button
          class="button-expediente diagnositoco"
          @click="obtenerMedicamentos(this.idbebe)"
        >
          Medicamentos
        </button>
        <button
          class="button-expediente diagnositoco agregar"
          @click="obternerCatalogoDiagnosticos()"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div style="display: flex">
        <button
          class="button-expediente alergias"
          @click="obtenerVacunas(this.idbebe)"
        >
          Vacunas
        </button>
        <button
          class="button-expediente alergias agregar"
          @click="obtenerCatalogoAlergias()"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="data-view-list">
      <div class="view-item" v-for="item in Medicinas" :key="item.id">
        <div class="text-item">
          <i class="fa-solid fa-align-left icon-text"></i>
          <p class="text-item-style">{{ item.nombre }} </p>
          <p class="text-item-style" v-if="isDate(item.detalle)">fecha {{ formatDate(item.detalle) }}</p>
          <p class="text-item-style" v-else> para {{ item.detalle }}</p>
        </div>
        <div v-if="this.isMedicine">
          <i
            class="fa-solid fa-trash icon-trash"
            @click="deleteDiagnostico(item.id, item.type)"
          ></i>
        </div>
      </div>
    </div>
  </div>

  <div class="addAllergyContainer" v-if="this.isAddAllergyPopupOpen">
    <div class="addAllergyContent">
      <div class="addAllergyHeader">
        <p>NUEVA ALERGIA</p>
      </div>
      <div style="margin-top: 2rem">
        <div
          class="addAllergyFlexContainer centerElements addAllergyinformationTop"
        >
          <p class="addAllergyTitle">Selecciona una alergia para agregarla</p>
        </div>
        <div style="margin-top: 1rem">
          <select class="addAllergySelect" v-model="padecimientoSeleccionado">
            <option
              v-for="alergia in this.CatalogoAlergias"
              :key="alergia.IDAlergia"
              :value="alergia.IDAlergia"
            >
              {{ alergia.Nombre }}
            </option>
          </select>
        </div>
        <div style="margin-top: 1rem">
          <div style="display: flex; flex-direction: column">
            <label class="addAllergyLabel" for="fechaInicio"
              >Fecha de incio</label
            >
            <input
              class="addAllergyInputFecha"
              id="fechaInicio"
              type="date"
              v-model="fechaInicio"
            />
          </div>
          <div style="display: flex; flex-direction: column; margin-top: 1rem">
            <label class="addAllergyLabel" for="fechaFin">Fecha final</label>
            <input
              class="addAllergyInputFecha"
              id="fechaFin"
              type="date"
              v-model="fechaFin"
            />
          </div>
        </div>
        <div class="addAllergyButtonsContainer">
          <button
            class="addAllergyButton add"
            @click="
              agregarNuevoPadecimiento(padecimientoSeleccionado, 'alergia')
            "
          >
            Guardar
          </button>
          <button
            class="addAllergyButton volver"
            @click="this.isAddAllergyPopupOpen = false"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="addDiagnosticContainer" v-if="this.isAddDiagnosticPopupOpen">
    <div class="addDiagnosticContent">
      <div class="addDiagnosticHeader">
        <p>NUEVO DIAGNOSTICO</p>
      </div>
      <div style="margin-top: 2rem">
        <div
          class="addDiagnosticFlexContainer centerElements addDiagnosticinformationTop"
        >
          <p class="addDiagnosticTitle">
            Selecciona un diagnostico junto a su médico
          </p>
        </div>
        <div style="margin-top: 1rem">
          <p class="addDiagnosticLabel">Diagnostico:</p>
          <select
            class="addDiagnosticSelect"
            v-model="padecimientoSeleccionado"
          >
            <option
              v-for="diagnotico in this.CatalogoDiagnosticos"
              :key="diagnotico.IDDiagnostico"
              :value="diagnotico.IDDiagnostico"
            >
              {{ diagnotico.Detalle }}
            </option>
          </select>
        </div>

        <div style="margin-top: 1rem">
          <p class="addDiagnosticLabel">Medico:</p>
          <input
            class="addDiagnosticInputFecha"
            id="fechaFin"
            type="text"
            v-model="nombreMedico"
          />
        </div>

        <div style="margin-top: 1rem">
          <label class="addDiagnosticLabel" for="fecha">Fecha:</label>
          <input
            class="addDiagnosticInputFecha"
            id="fecha"
            type="date"
            v-model="fechaInicio"
          />
        </div>

        <div class="addDiagnosticButtonsContainer">
          <button
            class="addDiagnosticButton add"
            @click="
              agregarNuevoPadecimiento(padecimientoSeleccionado, 'diagnostico')
            "
          >
            Guardar
          </button>
          <button
            class="addDiagnosticButton volver"
            @click="this.isAddDiagnosticPopupOpen = false"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { tr } from "date-fns/locale";

export default {
  data() {
    return {
      Medicinas: [],
      Medicamentos: [],
      Vacunas: [],
      CatalogoAlergias: [],
      CatalogoDiagnosticos: [],
      padecimientoSeleccionado: "",
      fechaInicio: "",
      fechaFin: "",
      idbebe: "",
      message: "",
      alertType: "",
      nombreMedico: "",
      isAddAllergyPopupOpen: false,
      isAddDiagnosticPopupOpen: false,
      isMedicine: false,
    };
  },
  methods: {
    deleteDiagnostico(id, type) {
      if (type == "diagnostico") {
        const url = "http://localhost:3000/eliminar-diagnostico/" + id;
        axios
          .get(url)
          .then((response) => {
            if (response.data.resultado) {
              this.obtenerDiagnosticos(this.idbebe);
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
        console.log(`ID Alergia: ${id}`);
        const url = "http://localhost:3000/eliminar-alergia/" + id;
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            if (response.data.resultado) {
              this.obtenerAlergias(this.idbebe);
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
    obtenerMedicamentos(id) {
      this.isMedicine = false;
      this.Medicamentos = [];
      this.Medicinas = [];
      const url = "http://localhost:3000/verMedicamentos/" + id;
      axios
        .get(url)
        .then((response) => {
          this.Medicamentos = response.data;
          this.Medicinas = this.Medicamentos.map((medicamento) => ({
            ...medicamento,
            type: "medicamento",
          }));
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    obtenerVacunas(id) {
      this.isMedicine = true;
      this.Medicinas = [];
      this.Vacunas = [];
      const url = "http://localhost:3000/verVacunas/" + id;
      axios
        .get(url)
        .then((response) => {
          this.Vacunas = response.data;
          this.Medicinas = this.Vacunas.map((vacuna) => ({
            ...vacuna,
            type: "vacuna",
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
    obtenerCatalogoAlergias() {
      this.isAddAllergyPopupOpen = true;
      const url = "http://localhost:3000/obtener-alergias";
      axios
        .get(url)
        .then((response) => {
          this.CatalogoAlergias = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    agregarNuevoPadecimiento(idPadecimiento, tipoInsert) {
      let data = {};

      if (tipoInsert == "alergia") {
        data = {
          idPadecimiento: idPadecimiento,
          tipoInsert: tipoInsert,
          IDbebe: this.idbebe,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
        };
      } else {
        data = {
          idPadecimiento: idPadecimiento,
          nombreMedico: this.nombreMedico,
          IDbebe: this.idbebe,
          fechaDiagnostico: this.fechaInicio,
        };
      }

      const url = "http://localhost:3000/insertar-padecimiento";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.resultado) {
            if (tipoInsert == "alergia") {
              this.obtenerAlergias(this.idbebe);
              this.isAddAllergyPopupOpen = false;
            } else {
              this.obtenerDiagnosticos(this.idbebe);
              this.isAddDiagnosticPopupOpen = false;
            }

            //Borrar datos de propiedades
            this.padecimientoSeleccionado = "";
            this.fechaFin = "";
            this.fechaInicio = "";
            this.nombreMedico = "";
          } else {
            this.message = "¡Ha ocurrido al insertar el padecimiento!";
            this.alertType = "error";
            this.showAlert();
          }
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    obternerCatalogoDiagnosticos() {
      this.isAddDiagnosticPopupOpen = true;
      const url = "http://localhost:3000/obtener-diagnosticos";
      axios
        .get(url)
        .then((response) => {
          this.CatalogoDiagnosticos = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    isDate(value) {
      return !isNaN(new Date(value));
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return dateString;
      } else {
        // Obtener el día, el mes y el año por separado
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        // Unir los valores en el formato deseado (día-mes-año)
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      }
    },
  },
  mounted() {
    this.idbebe = this.$route.params.id;
    console.log(this.idbebe);
  },
};
</script>

<style scoped>
.icon-text {
  color: #0f5b8e;
  margin-top: 1.5rem;
}
</style>
