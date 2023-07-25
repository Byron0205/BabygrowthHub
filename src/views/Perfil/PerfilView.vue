<template>
  <div>
    <div class="profile-container">
      <div class="profile-card">
        <i
          class="fa-regular fa-circle-user custom-icon-profile"
          style="color: #4f439a"
        ></i>
        <h2 class="text-profile">Perfil</h2>
        <div class="profile-role">
          <h3>{{ profileData.ROL }}</h3>
        </div>
      </div>
      <div class="information-container">
        <div class="personal-information-container">
          <div class="personal-information">
            <label for="name">Nombre</label>
            <input
              type="text"
              class="input-modify"
              :value="inputValue('Nombre')"
              @input="updateProfileData('Nombre', $event.target.value)"
              :readonly="!isInputEditable"
            />
            <label for="last-name">Apellidos</label>
            <input
              type="text"
              class="input-modify"
              :value="inputValue('Apellidos')"
              @input="updateProfileData('Apellidos', $event.target.value)"
              :readonly="!isInputEditable"
            />
            <label for="contact">Contacto</label>
            <input
              type="text"
              class="input-modify"
              :value="inputValue('Correo')"
              @input="updateProfileData('Correo', $event.target.value)"
              :readonly="!isInputEditable"
            />
            <button
              v-if="!isInputEditable"
              class="modify"
              @click="toggleInputEditable"
            >
              MODIFICAR
            </button>
            <div v-else>
              <button class="save" @click="saveProfileData">GUARDAR</button>
              <button class="cancel" @click="cancelEditing">CANCELAR</button>
            </div>
          </div>
        </div>
        <div v-if="userRole !== '3'" class="son-information-container">
          <div class="son-information">
            <label for="sons" class="sons-text">Hijos registrados</label>
            <select class="sons" v-model="selectedSon">
              <option
                v-for="son in profileData.hijos"
                :key="son.IDBebe"
                :value="son.IDBebe"
              >
                {{ son.NombreHijo }} {{ son.ApellidoHijo }}
              </option>
            </select>
            <label for="">Selecciona uno de tus tesoros para:</label>
            <button class="btn-galery">Galería del recuerdo</button>
            <button class="btn-expedient" @click="verExpedienteBebe">
              Expediente salud medicación
            </button>
            <button
              class="btn-baby-code"
              @click="viewSendBabyCode"
              v-if="selectedSon"
            >
              Compartir código bebé
            </button>
          </div>
        </div>
      </div>
      <div v-if="message" class="alert" :class="alertType">
        {{ message }}
      </div>
      <div  class="administrative-panel-container">
        <div v-if="userRole !== '3'" class="administrative-panel">
          <h2>Panel administrativo</h2>
          <button class="family-admin">Administrar familia</button>
          <button class="add-baby">Agregar otro bebé</button>
        </div>
      </div>
    </div>
    <div class="rainbow-decoration">
      <img
        src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-arcoiris.png"
        alt=""
      />
    </div>

    <div class="sendBabyCodeContainer" v-if="isSendCodePopupOpen">
      <div class="sendBabyCodeContent">
        <div class="sendBabyCodeHeader">
          <p>CÓDIGO BEBÉ</p>
        </div>

        <div class="formCreateNewEvent">
          <div class="sendBabyCodeFlexContainer">
            <label class="sendBabyCodeBabieName">{{ selectedNameSon }}</label>
            <input
              class="sendBabyCodeInput"
              type="text"
              readonly="true"
              v-model="babyCode"
            />

            <input
              class="sendBabyCodeInput"
              placeholder="Email"
              type="text"
              v-model="email"
            />
          </div>

          <div class="sendBabyCodeFlexContainer">
            <button
              :class="
                validEmail
                  ? 'sendBabyCodeButton send submit-sendEmail'
                  : 'sendBabyCodeButton send submit-disabled-sendEmail'
              "
              :disabled="!validEmail"
              @click="sendBabyCodeEmail"
            >
              Compartir
            </button>

            <button
              class="sendBabyCodeButton return"
              @click="isSendCodePopupOpen = false"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BabygrowthHubPerfilView",

  data() {
    return {
      profileData: {
        IDAdulto: "",
        Nombre: "",
        Apellidos: "",
        Correo: "",
        ROL: "",
      },
      isInputEditable: false,
      originalProfileData: {},
      modifiedProfileData: {},
      message: "",
      alertType: "",
      selectedSon: "",
      selectedNameSon: "",
      babyCode: "",
      email: "",
      validEmail: false,
      isSendCodePopupOpen: false,
    };
  },

    computed: {
        activeProfileData() {
            return this.isInputEditable ? this.modifiedProfileData : this.profileData;
        },
        hasChildren() {
            return this.profileData.hijos && this.profileData.hijos.length > 0;
        },
        userRole() {
            const userRole = localStorage.getItem('userRol')
            if (userRole === "0" || userRole === undefined) {
                this.$router.push('/login');
            }
            console.log(userRole);
            return userRole;
        },
    },
    mounted() {
        if (localStorage.getItem('session') !== '1') {
            this.$router.push('/login')
        }
        this.profileData.IDAdulto = localStorage.getItem('idAdulto');
        this.fetchProfileData();
        this.checkUserRolePermission();
    },

    methods: {
        checkUserRolePermission() {
            if (this.userRole == "3") {    
                this.isInputEditable = false;
            }
        },
        verExpedienteBebe() {
            this.$router.push('/expediente/salud/' + this.selectedSon)
        },
        fetchProfileData() {
            axios.get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/adultos/${this.profileData.IDAdulto}`)
                .then((response) => {
                    const profileDataFromAPI = response.data[0];
                    console.log(profileDataFromAPI)

          this.profileData.IDAdulto = localStorage.getItem("idAdulto");
          this.profileData.Nombre = profileDataFromAPI.Nombre;
          this.profileData.Apellidos = profileDataFromAPI.Apellidos;
          this.profileData.Correo = profileDataFromAPI.Correo;
          this.profileData.ROL = profileDataFromAPI.ROL;

          this.profileData.hijos = response.data.filter(
            (item) => item.IDBebe !== null
          );
        })
        .catch((error) => {
          console.error("Error al obtener datos del perfil:", error);
        });
    },

    toggleInputEditable() {
      this.isInputEditable = true;
      this.originalProfileData = { ...this.profileData };
      this.modifiedProfileData = { ...this.originalProfileData };
    },

    cancelEditing() {
      this.isInputEditable = false;
      this.modifiedProfileData = {};
    },
    showAlert() {
      const displayDuration = 3000;

      setTimeout(() => {
        this.message = "";
        this.alertType = "";
      }, displayDuration);
    },
    async saveProfileData() {
      if (
        !this.modifiedProfileData.Nombre ||
        !this.modifiedProfileData.Apellidos ||
        !this.modifiedProfileData.Correo
      ) {
        console.error("Error: Please fill in all required fields.");
        return;
      }

      try {
        await axios.put(
          `https://tiusr3pl.cuc-carrera-ti.ac.cr/adultos/${this.profileData.IDAdulto}`,
          {
            Nombre: this.modifiedProfileData.Nombre,
            Apellidos: this.modifiedProfileData.Apellidos,
            Correo: this.modifiedProfileData.Correo,
          }
        );

        this.profileData = { ...this.modifiedProfileData };

        this.modifiedProfileData = {};
        this.isInputEditable = false;

        this.message = "¡Perfil modificado exitosamente!";
        this.alertType = "success";
        this.showAlert();
      } catch (error) {
        console.error("Error while saving profile data:", error);
        this.message = "Error desconocido en el servidor";
        this.alertType = "error";
        this.showAlert();
      }
    },

    updateProfileData(field, value) {
      this.modifiedProfileData[field] = value;
    },

    inputValue(field) {
      return this.activeProfileData[field];
    },

    viewSendBabyCode() {
      this.isSendCodePopupOpen = true;
    },

    async sendBabyCodeEmail() {
      const data = {
        codigo: this.selectedSon,
        email: this.email,
        formatmail: "2",
      };
      axios
        .post("https://tiusr3pl.cuc-carrera-ti.ac.cr/enviar-codigo-bebe", data)
        .then((response) => {
          let msg = response.data;
          if (msg.codigoEnviado) {
            this.message = "Correo enviado con éxito!";
            this.alertType = "success";
            this.showAlert();
          } else {
            this.message = "Ha ocurrido un error al envíar el correo!";
            this.alertType = "error";
            this.showAlert();
          }
        })
        .catch((error) => {
          //error management
          console.error("Error al hacer el login: ", error);
        });
    },
    getSonFullName(selectedSonID) {
      const son = this.profileData.hijos.find(
        (son) => son.IDBebe === selectedSonID
      );
      return son ? `${son.NombreHijo} ${son.ApellidoHijo}` : "";
    },
  },
  watch: {
    email: function () {
      // Patrón para validar el formato del correo electrónico
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regex.test(this.email)) {
        console.log("VALIDO");
        this.validEmail = true;
      } else {
        console.log("invalido");
        this.validEmail = false;
      }
    },
    selectedSon() {
      // Cada vez que selectedSon cambie, actualiza el valor del input
      this.babyCode = this.selectedSon
      this.selectedNameSon = this.selectedSon
        ? this.getSonFullName(this.selectedSon)
        : "";
    },
  },
};
</script>
