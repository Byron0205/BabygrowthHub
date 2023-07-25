<template>
  <div class="container-register">
    <p class="title-register">¿Quién soy?</p>
    <form @submit.prevent="registrarBebe" class="login form-register">
      <div class="flex flex-register input-container width-50">
        <div class="input-container width-50 ic1">
          <input
            v-model="DatosBebe.Nombre"
            @input="validarNombre"
            maxlength="15"
            id="firstname"
            class="input"
            type="text"
            placeholder=""
          />
          <div class="cut"></div>
          <label for="firstname" class="placeholder placeholder-baby"
            >Nombre</label
          >
        </div>

        <!-- select -->
        <div class="input-container width-50 ic1">
          <select v-model="DatosBebe.Sexo" name="relacion" class="input" id="">
            <option value="M">masculino</option>
            <option value="F">femenino</option>
          </select>
          <div class="cut"></div>
          <label for="firstname" class="placeholder placeholder-baby"
            >Sexo</label
          >
        </div>
      </div>
      <div class="input-container width-50 ic1">
        <input
          v-model="DatosBebe.Apellidos"
          @input="validarApellidos"
          id="firstname"
          maxlength="25"
          class="input"
          type="text"
          placeholder=""
        />
        <div class="cut"></div>
        <label for="firstname" class="placeholder placeholder-baby"
          >Apellidos</label
        >
      </div>
      <div class="input-container width-50">
        <p class="baby-age-msg">
          ¿Nos podrías indicar si tu pequeño/a ya ha nacido o aún está en
          camino?
        </p>
      </div>
      <div class="input-container age-btn-container width-50 text-center">
        <div
          @click="ChangeStatusAge"
          :class="{
            'btn-age selected': selectedAgeStatus == 'not-born',
            'btn-age': selectedAgeStatus == 'born',
          }"
        >
          Viene en camino
        </div>
        <div
          @click="ChangeStatusAge"
          :class="{
            'btn-age selected': selectedAgeStatus == 'born',
            'btn-age': selectedAgeStatus == 'not-born',
          }"
        >
          Ya ha nacido
        </div>
        <div class="cut"></div>
      </div>
      <div v-if="selectedAgeStatus == 'born'" class="input-container width-50">
        <label class="select-age-label placeholder-baby"
          >Fecha de nacimiento</label
        >
        <div class="select-age-container">
          <select class="input select-age" v-model="selectedDay">
            <option v-for="day in days" :key="day">{{ day }}</option>
          </select>

          <select
            class="input select-age"
            v-model="selectedMonth"
            @change="updateAvailableDays"
          >
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>

          <select class="input select-age" v-model="selectedYear">
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <div v-else class="input-container width-50">
        <label class="select-age-label placeholder-baby"
          >Semanas de embarazo</label
        >
        <select v-model="DatosBebe.Edad" class="input select-age">
          <option
            v-for="semana in semanasEmbarazo"
            :key="semana"
            :value="semana"
          >
            Semana {{ semana }}
          </option>
        </select>
      </div>
      <div class="input-container width-50 ic1 text-center">
        <button
          :disabled="!isFormValid"
          :class="
            isFormValid
              ? 'submit submit-register pink-background'
              : 'submit-disabled submit-register pink-background-disabled'
          "
        >
          Confirmar
        </button>
      </div>
    </form>

    <svg
      class="img-cloud-bg"
      xmlns="http://www.w3.org/2000/svg"
      width="1374"
      height="753"
      viewBox="0 0 1374 753"
      fill="none"
    >
      <path
        d="M4.13109 714.835C-6.90012 704.336 6.19231 693.832 19.5902 688.581C32.9882 683.331 44.7918 677.05 55.6617 702.195C60.2175 712.734 48.0485 724.879 28.3505 724.879C13.4066 724.879 15.6287 725.777 4.13109 714.835ZM89.1566 695.932C59.8676 684.33 59.5468 654.076 89.1566 642.901C111.475 634.475 118.971 639.595 129.866 654.977C150.602 684.251 128.79 711.633 89.1566 695.932ZM177.274 670.729C177.274 670.729 132.384 649.771 152.024 622.948C168.514 572.655 230.751 609.822 230.751 609.822C230.751 609.822 255.659 628.155 236.019 654.977C215.508 682.988 177.274 670.729 177.274 670.729ZM810.413 748.875C760.335 740.943 728.358 731.256 690.067 712.418L669.289 702.195L633.699 715.018C614.122 722.07 585.865 729.708 570.898 731.986C430.862 753.32 293.736 691.289 257.966 590.431C253.099 576.704 249.134 570.528 245.629 571.214C242.788 571.768 226.469 572.883 209.365 573.692C152.725 576.368 106.571 563.061 66.7204 532.558C42.9885 514.395 32.6792 501.509 23.1974 478.161C10.4406 446.75 18.272 402.587 41.5316 374.776C56.2562 357.169 89.3399 334.657 113.487 325.811L135.86 317.618L140.717 299.17C159.095 229.367 245.727 177.132 343.12 177.132H365.699L368.169 159.878C377.847 92.2777 447.795 30.4482 541.739 6.45379C563.204 0.970731 574.898 0 619.487 0C664.07 0 675.764 0.970635 697.234 6.45379C768.211 24.5811 824.709 62.6768 853.227 111.629C859.338 122.118 866.296 130.049 869.107 129.722C871.859 129.403 884.606 126.361 897.435 122.962C929.19 114.548 985.544 112.561 1020.79 118.612C1088.9 130.301 1149.56 165.131 1178.18 208.986C1187.15 222.72 1177.92 212.56 1196.76 223.895C1215.61 235.229 1218.47 241.17 1240.34 244.155C1277.85 249.272 1295.75 258.092 1325.88 279.335C1348.03 294.949 1370.14 357.6 1373.81 406.4C1376.79 446.095 1344.43 516.139 1344.43 516.139C1344.43 516.139 1310.94 559.194 1248.07 576.522C1248.07 576.522 1240.34 620.684 1204.79 640.58C1176.62 656.341 1107.91 652.131 1107.91 652.131C1042.98 731.378 1035.08 753.758 872.167 752.981C851.856 752.884 824.061 751.034 810.408 748.871L810.413 748.875Z"
        fill="url(#paint0_linear_173_151)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_173_151"
          x1="1302"
          y1="256.039"
          x2="286.227"
          y2="654.061"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FA5B88" stop-opacity="0.05" />
          <stop offset="1" stop-color="#FA5B88" stop-opacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedAgeStatus: "born",
      semanasEmbarazo: 40,
      DatosBebe: {
        IDBebe: "",
        Nombre: "",
        Apellidos: "",
        Edad: "",
        FechaNacimiento: "",
        Sexo: "",
      },

      days: [],
      months: [],
      years: [],
      selectedDay: "",
      selectedMonth: "",
      selectedYear: "",

      validfield: false,
    };
  },
  methods: {
    ChangeStatusAge() {
      this.selectedAgeStatus =
        this.selectedAgeStatus == "born" ? "not-born" : "born";
    },
    generarCodigoInvitacion() {
      // Generar un número aleatorio entre 10000 y 99999
      const numeroAleatorio =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

      // Convertir el número a cadena de texto
      const codigoInvitacion = numeroAleatorio.toString();

      return codigoInvitacion;
    },

    validarFechaEdad() {
      if (this.selectedAgeStatus === "born") {
        this.selectedDate =
          this.selectedYear + "/" + this.selectedMonth + "/" + this.selectedDay;
        this.DatosBebe.FechaNacimiento = this.selectedDate;
        this.DatosBebe.Edad = "";
      } else {
        this.DatosBebe.FechaNacimiento = "";
      }
    },

    //metodo para enviar a guardar en BD
    registrarBebe() {
      this.validarFechaEdad();
      this.DatosBebe.IDBebe = this.generarCodigoInvitacion();
      const idAdulto = this.$route.params.idAdulto;

      const url = "https://tiusr3pl.cuc-carrera-ti.ac.cr/registrarBebe";

      axios
        .post(url, this.DatosBebe)
        .then((response) => {
          const msg = response.data;
          //console.log(msg);
          this.vincularBebe(this.DatosBebe.IDBebe, idAdulto)
          this.$router.push("/");
        })
        .catch((err) => {
          console.error("Error al obtener los datos: " + err);
        });
      //console.log(this.DatosBebe);
    },

    fillMonths() {
      this.months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
    },
    fillYears() {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 100;
      for (let year = startYear; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.years = this.years.reverse();
    },
    updateAvailableDays() {
      const maxDays = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      this.days = Array.from({ length: maxDays }, (_, index) => index + 1);
      if (this.selectedDay > maxDays) {
        this.selectedDay = null;
      }
    },

    validarNombre() {
      if (!this.validName) {
        // Si el usuario ingresó un valor no alfabético, actualizamos la variable para que contenga solo letras
        this.DatosBebe.Nombre = this.DatosBebe.Nombre.replace(/[^A-Za-z]/g, "");
      }
    },
    validarApellidos() {
      // Acepta letras mayúsculas, minúsculas y espacios
      this.DatosBebe.Apellidos = this.DatosBebe.Apellidos.replace(/[^A-Za-z\s]/g, '');
    },
    vincularBebe(idBebe, idAdulto) {
      const data = {
        idBebe: idBebe,
        idAdulto: idAdulto,
      };

      console.log(data);

      axios
        .post(`https://tiusr3pl.cuc-carrera-ti.ac.cr/vincular-adulto-bebe`, data)
        .then((response) => {
          const msg = response.data;
          console.log(msg);
          if (msg) {
            this.$router.push("/login");
          } else {
            this.message =
              "Ha ocurrido un error al hacer la vinculación, intenelo más tarde!";
            this.alertType = "error";
            this.showAlert();
          }
        })
        .catch((error) => {
          console.error("Error al vincular el adulto con el bebé: ", error);
        });
    },
  },
  computed: {
    availableDays() {
      if (this.selectedMonth) {
        const maxDays = new Date(
          this.selectedYear,
          this.selectedMonth,
          0
        ).getDate();
        return this.days.slice(0, maxDays);
      } else {
        return this.days;
      }
    },
    // Calcula si el formulario es válido
    isFormValid() {
      const nombreValido = this.DatosBebe.Nombre.trim() !== "";
      const apellidosValidos = this.DatosBebe.Apellidos.trim() !== "";
      const sexoValido = this.DatosBebe.Sexo.trim() !== "";

      if (this.selectedAgeStatus === "born") {
        // Si el bebé ya ha nacido, validar la fecha de nacimiento
        const fechaNacimientoValida =
          this.selectedDay !== "" &&
          this.selectedMonth !== "" &&
          this.selectedYear !== "";
        return (
          nombreValido &&
          apellidosValidos &&
          sexoValido &&
          fechaNacimientoValida
        );
      } else {
        // Si el bebé está en camino, validar la edad
        const edadValida = this.DatosBebe.Edad !== "";
        return nombreValido && apellidosValidos && sexoValido && edadValida;
      }
    },

    // Función computada para validar que la variable tenga solo letras
    validName() {
      return /^[A-Za-z]*$/.test(this.DatosBebe.Nombre);
    },
    validApellidos() {
      return /^[A-Za-z]*$/.test(this.DatosBebe.Apellidos);
    },
  },
  watch: {
    selectedMonth() {
      this.selectedDay = null;
    },
  },
  mounted() {
    // Llena los selects con los valores correspondientes
    this.fillMonths();
    this.fillYears();
  },
};
</script>

<style></style>
