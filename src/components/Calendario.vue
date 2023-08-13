<template>
  <div class="container-nombre-expediente">
    <label for="sons" class="lbl-son">Estas viendo los eventos de:</label>
    <select class="select-sons" v-model="selectedSon" @change="getActivities">
      <option class="sons-text" v-for="son in registeredBabies" :key="son.IDBebe" :value="son.IDBebe">
        {{ son.NombreCompleto }}
      </option>
    </select>


    <div class="containterCalendar">
      <div class="headerCalendar">
        <button class="nextButton" @click="previousMonth">
          <i class="fa-solid fa-arrow-left calendarButtonIcon"></i>
        </button>
        <p class="mes">{{ currentMonth }}</p>
        <button class="nextButton" @click="nextMonth">
          <i class="fa-solid fa-arrow-right calendarButtonIcon"></i>
        </button>
      </div>
      <div>
        <img class="img" src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Efecto-nube.png"
          alt="fondo nubes" />
      </div>

      <table class="tableCalendar">
        <thead>
          <tr>
            <th class="nameDayWeek" v-for="day in daysOfWeek" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td class="cellsCalendar" v-for="day in week" :key="day.date">
              <!-- Metodos 'isToday' y 'isSelected retornan boolean y segun este se aplica la clase 'today' o 'isSelected'' -->
              <div :class="{
                calendarToday: isToday(day),
                isSelected: isSelected(day),
              }">
                <span class="calendarDay" @click="selectDate(day)">{{
                  day.day
                }}</span>
                <!-- --------------------------------------------------------------------------------------- -->
                <div v-if="!ismobileView">
                  <div v-for="event in getEventsForDate(day.date)" :key="event.IDActividad" class="calendarEvent"
                    :style="{ backgroundColor: event.CategoriaColor }" @click="viewEvent(event)">
                    {{ event.Titulo }}
                  </div>
                </div>
                <!-- --------------------------------------------------------------------------------------- -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Lista de eventos -->
      <div class="selectedDayEvents">
        <h3>Eventos del día {{ formatDate(selectedDate) }}</h3>
        <button @click="isNewEventPopupOpen = true">Agregar evento</button>
        <ul>
          <li v-for="event in selectedDayEvents" :key="event.IDActividad" class="selectedDayEvent" :style="{ backgroundColor: event.CategoriaColor }">
            <div class="selectedDayEventInfo">
              <div class="selectedDayEventTitle">{{ event.Titulo }}</div>
            </div>
            <button @click="viewEvent(event)">Ver detalles</button>
          </li>
        </ul>
      </div>

      <div class="createEventContainer" v-if="isNewEventPopupOpen">
        <div class="createEventContent">
          <div class="createEventHeader">
            <p>NUEVA ACTIVIDAD</p>
          </div>

          <div class="formCreateNewEvent">
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventName">Nombre Actividad</label>
              <input class="newEventInput" type="text" id="newEventName" v-model="eventName" maxlength="100" />
            </div>
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventDescription">Detalle</label>
              <textarea class="newEventInput newEventTextArea" id="newEventDescription" v-model="eventDescription"
                maxlength="300"></textarea>
            </div>
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventDate">Fecha</label>
              <input class="newEventInput" type="text" id="newEventDate" v-model="eventDate" readonly />
            </div>

            <div class="newEventFlexContainer row">
              <div class="newEventFlexContainer">
                <label class="newEventLabel" for="newEventPriority">Seleccione una prioridad</label>
                <select class="newEventSelect" id="newEventPriority" v-model="eventPriority">
                  <option v-for="priority in priorities" :key="priority.idPrioridad" :value="priority">
                    {{ priority.nombrePrioridad }}
                  </option>
                </select>
              </div>
              <div class="newEventFlexContainer">
                <label class="newEventLabel" for="newEventCategory">Seleccione una categoria</label>
                <select class="newEventSelect" id="newEventCategory" v-model="eventCategory">
                  <option v-for="category in categories" :key="category.IDCategoria" :value="category">
                    {{ category.Nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventBaby">Actividad asociada a</label>
              <select class="newEventSelect babieSelect" id="newEventBaby" v-model="eventBaby">
                <option v-for="babie in registeredBabies" :key="babie.IDBebe" :value="babie">
                  {{ babie.NombreCompleto }}
                </option>
              </select>
            </div>
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="eventTime">Seleccione una hora</label>
              <input class="newEventSelect" type="time" id="eventTime" v-model="eventTime" />
            </div>

            <div class="newEventFlexContainer row">
              <button class="newEventBnt save" @click="saveEvent">Guardar</button>
              <button class="newEventBnt cancel" @click="isNewEventPopupOpen = false">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="eventDetailsContainer" v-if="selectedEvent">
      <div class="eventDetailsContent">
        <div class="eventDetailsHeader">
          <p>RESUMEN ACTIVIDAD</p>
        </div>
        <div style="margin-top: 1rem">
          <div class="eventDetailsFlexContainer centerElements informationTop">
            <p class="eventDetailsTitle">{{ selectedEvent.Titulo }}</p>
            <div class="eventDetailsFlexContainer centerElements">
              <i class="fa-solid fa-tag" :style="{ color: selectedEvent.CategoriaColor }"></i>
              <p class="eventDetailsCategory" :style="{ color: selectedEvent.CategoriaColor }">
                {{ selectedEvent.CategoriaNombre }}
              </p>
            </div>
          </div>
        </div>

        <div class="eventDetailsFlexContainer centerElements eventDetailsDateContainer">
          <i class="fa-regular fa-clock eventDetailsDate"></i>
          <p class="eventDetailsDate">{{ formatDate(selectedEvent.Fecha) }}</p>
          <p class="eventDetailsDate">{{ selectedEvent.Hora }}</p>
        </div>

        <div class="eventDetailsFlexContainer centerElements" style="margin-top: 1rem">
          <p class="eventDetailsPriority" :style="{ color: selectedEvent.colorPrioridad }">
            {{ selectedEvent.nombrePrioridad }}
          </p>
          <p class="eventDetailsBabie">
            Asociada a {{ selectedEvent.NombreCompleto }}
          </p>
        </div>

        <div class="eventDetailsFlexContainer eventDetailsDescriptionContainer centerElements">
          <i class="fa-solid fa-align-left" style="padding: 1rem"></i>
          <p class="eventDetailsDescription">{{ selectedEvent.Detalle }}</p>
        </div>
        <div class="eventDetailsButtonsContainer">
          <button class="eventDetailsButton delete" @click="deleteEvent(selectedEvent.IDActividad, selectedEvent.IDBebe)">
            <i class="fa-solid fa-trash-can"></i> Eliminar actividad
          </button>
          <button class="eventDetailsButton cancel" @click="selectedEvent = null">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  parseISO,
} from "date-fns";

import axios from "axios";

export default {
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      events: [],
      daysOfWeek: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      eventName: "",
      eventDescription: "",
      eventTime: "",

      reminder: false,

      isNewEventPopupOpen: false,
      isViewEventPopupOpen: false,
      eventDate: null,
      categories: [],
      priorities: [],
      eventCategory: null,
      eventPriority: null,
      eventBaby: null,
      registeredBabies: [],
      selectedEvent: null,
      IDAdulto: '',
      selectedSon: '',

      ismobileView: window.innerWidth <= 1024, // Determinar si la vista es de teléfono
      selectedDayEvents: []
    };
  },
  computed: {
    currentMonth() {
      return format(this.currentDate, "MMMM yyyy");
    },
    calendar() {
      const startOfMonthDate = startOfMonth(this.currentDate);
      const endOfMonthDate = endOfMonth(this.currentDate);
      const startOfWeekDate = startOfWeek(startOfMonthDate);
      const endOfWeekDate = endOfWeek(endOfMonthDate);

      const days = [];
      let dayCounter = startOfWeekDate;

      while (dayCounter <= endOfWeekDate) {
        const week = [];

        for (let i = 0; i < 7; i++) {
          const day = {
            day: format(dayCounter, "d"),
            date: new Date(dayCounter),
          };

          week.push(day);
          dayCounter = addDays(dayCounter, 1);
        }

        days.push(week);
      }

      return days;
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = addMonths(this.currentDate, -1);
    },
    nextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
    isToday(day) {
      const today = new Date();
      return format(day.date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    },
    isSelected(day) {
      return (
        day.date &&
        this.selectedDate &&
        format(day.date, "yyyy-MM-dd") ===
        format(this.selectedDate, "yyyy-MM-dd")
      );
    },
    selectDate(day) {
      if (day.date) {
        this.selectedDate = day.date;
        this.eventDate = format(day.date, "dd/MM/yyyy");
        this.selectedDayEvents = this.getEventsForDate(this.selectedDate); // Asignar los eventos del día seleccionado
        if (!this.ismobileView) {
          this.isNewEventPopupOpen = true;
        }

      }
    },
    saveEvent() {
      const selectedCategory = this.eventCategory;
      const selectedPriority = this.eventPriority;
      const selectedBaby = this.eventBaby.IDBebe;

      // Crear un objeto con los datos a enviar en el cuerpo de la solicitud
      const data = {
        titulo: this.eventName,
        detalle: this.eventDescription,
        fecha: this.selectedDate,
        hora: this.eventTime,
        idbebe: selectedBaby,
        idcategoria: selectedCategory.IDCategoria,
        idprioridad: selectedPriority.idPrioridad,
      };
      // Realizar la solicitud POST con el objeto de datos como cuerpo de la solicitud
      axios
        .post("https://tiusr3pl.cuc-carrera-ti.ac.cr/insertar-actividad", data)
        .then((response) => {
          this.selectedEvent = null;
          this.getActivities()
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });

      // Reset input values
      this.eventName = "";
      this.eventDescription = "";
      this.eventPriority = null;
      this.eventCategory = null;
      this.eventBaby = null;
      this.eventTime = "";

      this.isNewEventPopupOpen = false;
    },
    getEventsForDate(date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      return this.events
        .filter((event) => {
          const eventDate = format(parseISO(event.Fecha), "yyyy-MM-dd");
          return eventDate === formattedDate;
        })
        .map((event) => ({
          ...event,
          color: this.getCategoryColor(event.CategoriaNombre),
        }));
    },
    getCategoryColor(categoryName) {
      const category = this.categories.find(
        (category) => category.Nombre === categoryName
      );
      return category ? category.Color : "";
    },
    viewEvent(event) {
      this.selectedEvent = event;
    },
    deleteEvent(eventId, babyId) {
      this.postDeleteActivity(eventId, babyId);
    },
    getCategories() {
      axios
        .get("https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-categorias")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    getPriorities() {
      axios
        .get("https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-prioridades")
        .then((response) => {
          this.priorities = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    getActivities() {
      axios
        .get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-actividades/${this.IDAdulto}`)
        .then((response) => {
          this.events = response.data;
          this.events = this.events.filter(event => event.IDBebe === this.selectedSon)
          //console.log(this.events);
          //console.log(this.selectedSon);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    postDeleteActivity(idActividad, idBebe) {
      axios
        .post(
          `https://tiusr3pl.cuc-carrera-ti.ac.cr/eliminar-actividad/${idActividad}/${idBebe}`
        )
        .then((response) => {
          this.selectedEvent = null;
          this.getActivities()
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    getBabies() {
      axios
        .get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-bebes/${this.IDAdulto}`)
        .then((response) => {
          this.registeredBabies = response.data;
          this.selectedSon = this.registeredBabies[0].IDBebe
          this.getActivities()
          //console.log(this.registeredBabies);
          //console.log(this.selectedSon)
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Los meses en JavaScript son base 0, por eso sumamos 1
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  mounted() {
    /* !Obtener ID adulto que haya iniciado sesion */
    this.IDAdulto = localStorage.getItem('idAdulto');
    this.getBabies(this.IDAdulto);
    this.getCategories();
    this.getPriorities();
  },
};
</script>

<style>
.selectedDayEvents {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.selectedDayEvent {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}

.selectedDayEventColor {
  width: 10px;
  height: 100%;
}

.selectedDayEventTitle {
  margin-left: 10px;
}

.selectedDayEvent button {
  margin-left: auto;
}
</style>
