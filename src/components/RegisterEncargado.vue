<template>
  <div class="container-register">
    <p class="title-register">¿Quién eres?</p>
    <form @submit.prevent="registerFormEncargado" class="login form-register">
      <div class="input-container width-50">
        <input title="formato: 000000000" @input="validarCedula" v-model="encargado.IDAdulto" @blur="obtenerDataUser" maxlength="9" class="input"
          type="text" placeholder="" />
        <div class="cut"></div>
        <label class="placeholder">Cedula</label>
      </div>

      <div class="input-container width-50">
        <input v-model="encargado.Nombre" @input="validarNombre" :disabled="blockNombre" max="15" class="input" type="text" placeholder="" />
        <div class="cut"></div>
        <label class="placeholder">Nombre</label>
      </div>
      <div class="input-container width-50">
        <input v-model="encargado.Apellidos" @input="validarApellidos" :disabled="blockApellidos" maxlength="25" class="input" type="text"
          placeholder="" />
        <div class="cut"></div>
        <label class="placeholder">Apellidos</label>
      </div>
      <div class="input-container width-50">
        <input v-model="encargado.Correo" maxlength="50" class="input" type="text" placeholder="" />
        <div class="cut"></div>
        <label class="placeholder">Correo</label>
      </div>
      <div class="input-container width-50">
        <input v-model="encargado.Contrasenna" maxlength="12" class="input" type="text" placeholder="" />
        <div class="cut"></div>
        <label class="placeholder">Contraseña</label>
      </div>
      <div class="input-container width-50 text-center">
        <button :disabled="!validfield" :class="validfield
            ? 'submit submit-register'
            : 'submit-disabled submit-register'
          ">
          Confirmar
        </button>
      </div>
    </form>
    <svg class="img-cloud-bg" xmlns="http://www.w3.org/2000/svg" width="1374" height="722" viewBox="0 0 1374 722"
      fill="none">
      <path
        d="M4.13109 685.406C-6.90012 675.34 6.19231 665.268 19.5902 660.233C32.9882 655.199 44.7918 649.176 55.6617 673.287C60.2175 683.392 48.0485 695.037 28.3505 695.037C13.4066 695.037 15.6287 695.898 4.13109 685.406ZM89.1566 667.282C59.8676 656.157 59.5468 627.149 89.1566 616.433C111.475 608.354 118.971 613.264 129.866 628.013C150.602 656.081 128.79 682.336 89.1566 667.282ZM177.274 643.116C177.274 643.116 132.384 623.021 152.024 597.302C168.514 549.079 230.751 584.716 230.751 584.716C230.751 584.716 255.659 602.294 236.019 628.013C215.508 654.871 177.274 643.116 177.274 643.116ZM810.413 718.045C760.335 710.439 728.358 701.151 690.067 683.089L669.289 673.287L633.699 685.581C614.122 692.344 585.865 699.666 570.898 701.851C430.862 722.307 293.736 662.829 257.966 566.124C253.099 552.961 249.134 547.04 245.629 547.698C242.788 548.229 226.469 549.298 209.365 550.074C152.725 552.64 106.571 539.88 66.7204 510.633C42.9885 493.218 32.6792 480.863 23.1974 458.476C10.4406 428.358 18.272 386.013 41.5316 359.347C56.2562 342.465 89.3399 320.88 113.487 312.398L135.86 304.542L140.717 286.853C159.095 219.924 245.727 169.839 343.12 169.839H365.699L368.169 153.297C377.847 88.4788 447.795 29.1947 541.739 6.18809C563.204 0.930768 574.898 0 619.487 0C664.07 0 675.764 0.930675 697.234 6.18809C768.211 23.5692 824.709 60.0964 853.227 107.033C859.338 117.091 866.296 124.695 869.107 124.382C871.859 124.076 884.606 121.159 897.435 117.9C929.19 109.832 985.544 107.927 1020.79 113.729C1088.9 124.937 1149.56 158.332 1178.18 200.383C1187.15 213.55 1177.92 203.809 1196.76 214.677C1215.61 225.545 1218.47 231.241 1240.34 234.104C1277.85 239.01 1295.75 247.467 1325.88 267.835C1348.03 282.806 1370.14 342.878 1373.81 389.669C1376.79 427.73 1344.43 494.89 1344.43 494.89C1344.43 494.89 1310.94 536.173 1248.07 552.787C1248.07 552.787 1240.34 595.131 1204.79 614.208C1176.62 629.32 1107.91 625.284 1107.91 625.284C1042.98 701.268 1035.08 722.727 872.167 721.981C851.856 721.889 824.061 720.115 810.408 718.041L810.413 718.045Z"
        fill="url(#paint0_linear_163_139)" />
      <defs>
        <linearGradient id="paint0_linear_163_139" x1="1302" y1="245.498" x2="297.949" y2="655.819"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#7ECAFD" stop-opacity="0.2" />
          <stop offset="1" stop-color="#7ECAFD" stop-opacity="0.05" />
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
      encargado: {
        IDAdulto: "",
        Nombre: "",
        Apellidos: "",
        Correo: "",
        Contrasenna: "",
      },

      validfield: false,

      blockNombre: false,
      blockApellidos: false
    };
  },
  methods: {

    async obtenerDataUser() {
      const url = 'https://rh-persons.onrender.com/persona'

      const res = await axios.get(url, {
        params: { id: this.encargado.IDAdulto }
      },)
      const data = res.data
      this.encargado.Nombre = data.Nombre
      this.encargado.Apellidos = data.last_name

      this.blockNombre = true
      this.blockApellidos = true
    },

    registerFormEncargado() {
      const url = "https://tiusr3pl.cuc-carrera-ti.ac.cr/registrarAdulto";
      axios
        .post(url, this.encargado)
        .then((response) => {
          this.vincularBebe()
        })
        .catch((error) => {
          console.error("Error al guardar el encargado: " + error);
        });
    },
    validarCampos() {
      // Verificar si todos los campos son válidos
      const total = Object.values(this.encargado).every(
        (value) => value !== ""
      );
      if (this.validarCorreo(this.encargado.Correo) && total) {
        this.validfield = true;
      } else {
        this.validfield = false;
      }
    },

    validarCorreo(correo) {
      // Patrón para validar el formato del correo electrónico
      var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Verificar si el correo cumple con el patrón
      return patron.test(correo);
    },
    validarCedula() {
      if (!this.validCedula) {
        // Si el usuario ingresó un valor no numérico, actualizamos la variable para que contenga solo números
        this.encargado.IDAdulto = this.encargado.IDAdulto.replace(/[^\d]/g, "");
      }
    },

    validarNombre() {
      if (!this.validName) {
        // Si el usuario ingresó un valor no alfabético, actualizamos la variable para que contenga solo letras
        this.encargado.Nombre = this.encargado.Nombre.replace(/[^A-Za-z]/g, "");
      }
    },
    validarApellidos() {
      // Acepta letras mayúsculas, minúsculas y espacios
      this.encargado.Apellidos = this.encargado.Apellidos.replace(/[^A-Za-z\s]/g, '');
    },
    vincularBebe() {
      const idBebe = this.$route.params.idBebe;
      const idAdulto = this.encargado.IDAdulto;
      const data = {
        idBebe: idBebe,
        idAdulto: idAdulto,
        EncargadoPrincipal: 0,
        IDRol: 5
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
  watch: {
    encargado: {
      deep: true,
      handler() {
        this.validarCampos();
      },
    },
  },
  computed: {
    // Función computada para validar que la variable tenga solo números
    validCedula() {
      return /^\d*$/.test(this.encargado.IDAdulto);
    },
    // Función computada para validar que la variable tenga solo letras
    validName() {
      return /^[A-Za-z]*$/.test(this.encargado.Nombre);
    },
    validApellidos() {
      return /^[A-Za-z]*$/.test(this.encargado.Apellidos);
    },
  },
};
</script>

<style></style>
