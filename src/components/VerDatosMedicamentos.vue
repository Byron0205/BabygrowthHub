<template>
  <div class="viewMedicalData">
    <p class="description-MedicalData">
      Selecciona alguna de las siguientes opciones para poder ver los datos
    </p>
    <div class="select-Data">
      <div style="display: flex">
        <button
          class="button-medicina medicamento"
          @click="obtenerMedicamentos(this.idbebe)"
        >
          Medicamentos
        </button>
        <button
          class="button-medicina medicamento agregar"
          @click="obternerDiagnosticosBebe()"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div style="display: flex">
        <button
          class="button-medicina vacuna"
          @click="obtenerVacunas(this.idbebe)"
        >
          Vacunas
        </button>
        <button
          class="button-medicina vacuna agregar"
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
          <p class="text-item-style">  {{ item.nombre }}</p>
          <p class="text-item-style"  v-if="isDate(item.detalle)">
            {{ formatDate(item.detalle) }}
          </p>
          <p class="text-item-style" v-else> | Diagnostico {{ item.detalle }}</p>
        </div>
        <div>
          <i
            class="fa-solid fa-trash icon-trash"
            @click="deleteMedicina(item.id, item.type)"
          ></i>
        </div>
      </div>
    </div>
  </div>

  <div class="addVacunaContainer" v-if="this.isAddVacunaPopupOpen">
    <div class="addVacunaContent">
      <div class="addVacunaHeader">
        <p>NUEVA VACUNA</p>
      </div>
      <div style="margin-top: 2rem">
        <div
          class="addAllergyFlexContainer centerElements addVacunainformationTop"
        >
          <p class="addVacunaTitle">Selecciona una vacuna para agregarla</p>
        </div>
        <div style="margin-top: 1rem">
          <label class="addVacunaLabel"
              >Vacunas</label
            >
          <select class="addVacunaSelect" v-model="medicinaSeleccionado" >
            <option
              v-for="vacuna in this.CatalogoVacunas"
              :key="vacuna.IDVacuna"
              :value="vacuna.IDVacuna"
            >
              {{ vacuna.Nombre }}
            </option>
          </select>
        </div>
        <div style="margin-top: 1rem">
          <div style="display: flex; flex-direction: column">
            <label class="addVacunaLabel" for="fechaVacuna"
              >Fecha de aplicación</label
            >
            <input
              class="addVacunaInputFecha"
              id="fechaVacuna"
              type="date"
              v-model="fechaVacuna"
            />
          </div>
        </div>
        <div class="addAllergyButtonsContainer">
          <button
            class="addVacunaButton add"
            @click="
              agregarMedicina(medicinaSeleccionado, 'vacuna')
            "
          >
            Guardar
          </button>
          <button
            class="addVacunaButton volver"
            @click="this.isAddVacunaPopupOpen = false"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="addMedicamentoContainer" v-if="this.isAddMedicamentoPopupOpen">
    <div class="addMedicamentoContent">
      <div class="addMedicamentoHeader">
        <p>NUEVO MEDICAMENTO</p>
      </div>
      <div style="margin-top: 2rem">
        <div
          class="addDiagnosticFlexContainer centerElements addMedicamentoinformationTop"
        >
          <p class="addMedicamentoTitle">
            Selecciona un diagnostico junto a su medicamento
          </p>
        </div>
        <div style="margin-top: 1rem">
          <p class="addMedicamentoLabel">Diagnostico actuales del bebé:</p>
          <select
            class="addMedicamentoSelect"
            v-model="diagnosticoSeleccionado"
            @change="obternerMedicamentosDiagnostico()"
          >
            <option
              v-for="diagnotico in this.Diagnosticosbebe"
              :key="diagnotico.id"
              :value="diagnotico.id"
            >
              {{ diagnotico.Padecimiento }}
            </option>
          </select>
        </div>

        <div style="margin-top: 1rem">
          <p class="addMedicamentoLabel">Medicamentos para el diagnostico:</p>
          <select
            class="addMedicamentoSelect"
            v-model="medicinaSeleccionado"
          >
            <option
              v-for="medicamentoDiagnostico in this.DiagnosticosMedicamentos"
              :key="medicamentoDiagnostico.IDMedicamento"
              :value="medicamentoDiagnostico.IDMedicamento"
            >
              {{ medicamentoDiagnostico.Nombre }}
            </option>
          </select>
        </div>

        <div class="addMedicamentoButtonsContainer">
          <button
            class="addMedicamentoButton add"
            @click="
              agregarMedicina(medicinaSeleccionado, 'medicamento')
            "
          >
            Guardar
          </button>
          <button
            class="addMedicamentoButton volver"
            @click="this.isAddMedicamentoPopupOpen = false"
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
      Diagnosticosbebe : [],
      DiagnosticosMedicamentos: [],
      CatalogoVacunas: [],
      CatalogoDiagnosticos: [],
      medicinaSeleccionado: "",
      diagnosticoSeleccionado:"",
      fechaVacuna: "",
      idbebe: "",
      message: "",
      alertType: "",
      nombreMedico: "",
      isAddVacunaPopupOpen: false,
      isAddMedicamentoPopupOpen: false,
    };
  },
  methods: {
    deleteMedicina(id, type) {
      if (type == "medicamento") {
        const url = "http://localhost:3000/eliminar-medicamento/" + id;
        axios
          .get(url)
          .then((response) => {
            if (response.data.resultado) {
              this.obtenerMedicamentos(this.idbebe);
            } else {
              this.message = "¡Ha ocurrido al eliminar el medicamento!";
              this.alertType = "error";
              this.showAlert();
            }
          })
          .catch((err) => {
            console.error("Error al obtener los datos: " + err);
          });
      } else {
        const url = "http://localhost:3000/eliminar-vacuna/" + id;
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            if (response.data.resultado) {
              this.obtenerVacunas(this.idbebe);
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
      this.isAddVacunaPopupOpen = true;
      const url = "http://localhost:3000/obtener-vacunas";
      axios
        .get(url)
        .then((response) => {
          this.CatalogoVacunas = response.data;
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
    obternerDiagnosticosBebe() {
      this.isAddMedicamentoPopupOpen = true;
      const url = "http://localhost:3000/obtener-diagnosticos-bebe/" + this.idbebe;
      axios
        .get(url)
        .then((response) => {
          this.Diagnosticosbebe = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    obternerMedicamentosDiagnostico() {
      console.log(this.diagnosticoSeleccionado);
      const url = "http://localhost:3000/obtener-diagnosticos-medicamentos/" + this.diagnosticoSeleccionado;
      axios
        .get(url)
        .then((response) => {
          this.DiagnosticosMedicamentos = response.data;
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
    },
    agregarMedicina(idMedicina, tipoInsert) {
      let data = {};

      if (tipoInsert == "medicamento") {
        data = {
          IDmedicina: idMedicina,
          tipoInsert: tipoInsert,
          IDbebe: this.idbebe,
          IDDiagnostico: this.diagnosticoSeleccionado,
        };
      } else {
        data = {
          IDmedicina: idMedicina,
          tipoInsert: tipoInsert,
          IDbebe: this.idbebe,
          FechaAplicacion: this.fechaVacuna,
        };
      }

      console.log(data);

      const url = "http://localhost:3000/insertar-medicina";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.resultado) {
            if (tipoInsert == "medicamento") {
              this.obtenerMedicamentos(this.idbebe);
              this.isAddMedicamentoPopupOpen = false;
            } else {
              this.obtenerVacunas(this.idbebe);
              this.isAddVacunaPopupOpen = false;
            }

            //Borrar datos de propiedades
            this.diagnosticoSeleccionado = "";
            this.fechaVacuna = "";
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
    isDate(value) {
      return !isNaN(new Date(value));
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return dateString;
      } else {
        // Obtener el día, el mes y el año por separado
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
