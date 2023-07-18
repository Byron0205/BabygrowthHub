<template>
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
      <img class="img" src="../assets/img/Efecto-nube.png" alt="fondo nubes" />
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
            <div
              :class="{
                calendarToday: isToday(day),
                isSelected: isSelected(day),
              }"
            >
              <span class="calendarDay" @click="selectDate(day)">{{
                day.day
              }}</span>
              <div
                v-for="event in getEventsForDate(day.date)"
                :key="event.id"
                class="calendarEvent"
                :style="{ backgroundColor: event.color }"
                @click="viewEvent(event)"
              >
                {{ event.title }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="createEventContainer" v-if="isNewEventPopupOpen">
      <div class="createEventContent">
        <div class="createEventHeader">
          <p>NUEVA ACTIVIDAD</p>
        </div>

        <div class="formCreateNewEvent">
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventName"
              >Nombre Actividad</label
            >
            <input
              class="newEventInput"
              type="text"
              id="newEventName"
              v-model="eventName"
            />
          </div>
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventDescription"
              >Detalle</label
            >
            <textarea
              class="newEventInput newEventTextArea"
              id="newEventDescription"
              v-model="eventDescription"
            ></textarea>
          </div>
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventDate">Fecha</label>
            <input
              class="newEventInput"
              type="text"
              id="newEventDate"
              v-model="eventDate"
              readonly
            />
          </div>

          <div class="newEventFlexContainer row">
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventPriority"
                >Seleccione una prioridad</label
              >
              <select
                class="newEventSelect"
                id="newEventPriority"
                v-model="eventPriority"
              >
                <option
                  v-for="priority in proritiesList"
                  :key="priority.id"
                  :value="priority"
                >
                  {{ priority.name }}
                </option>
              </select>
            </div>
            <div class="newEventFlexContainer">
              <label class="newEventLabel" for="newEventCategory"
                >Seleccione una categoria</label
              >
              <select
                class="newEventSelect"
                id="newEventCategory"
                v-model="eventCategory"
              >
                <option
                  v-for="category in categoriesList"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventBaby"
              >Actividad asociada a</label
            >
            <select
              class="newEventSelect babieSelect"
              id="newEventBaby"
              v-model="eventBaby"
            >
              <option
                v-for="babie in babiesList"
                :key="babie.id"
                :value="babie"
              >
                {{ babie.name }}
              </option>
            </select>
          </div>
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="eventTime"
              >Seleccione una hora</label
            >
            <input
              class="newEventSelect"
              type="time"
              id="eventTime"
              v-model="eventTime"
            />
          </div>

          <div class="newEventFlexContainer row">
            <button class="newEventBnt save" @click="saveEvent">Guardar</button>
            <button
              class="newEventBnt cancel"
              @click="isNewEventPopupOpen = false"
            >
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
          <p class="eventDetailsTitle">{{ selectedEvent.title }}</p>
          <div class="eventDetailsFlexContainer centerElements">
            <i
              class="fa-solid fa-tag"
              :style="{ color: selectedEvent.color }"
            ></i>
            <p
              class="eventDetailsCategory"
              :style="{ color: selectedEvent.categoryColor }"
            >
              {{ selectedEvent.category }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="eventDetailsFlexContainer centerElements eventDetailsDateContainer"
      >
        <i class="fa-regular fa-clock eventDetailsDate"></i>
        <p class="eventDetailsDate">{{ selectedEvent.date }}</p>
        <p class="eventDetailsDate">{{ selectedEvent.time }}</p>
      </div>

      <div
        class="eventDetailsFlexContainer centerElements"
        style="margin-top: 1rem"
      >
        <p
          class="eventDetailsPriority"
          :style="{ color: selectedEvent.priorityColor }"
        >
          {{ selectedEvent.priority }}
        </p>
        <p class="eventDetailsBabie">Asociada a {{ selectedEvent.babie }}</p>
      </div>

      <div
        class="eventDetailsFlexContainer eventDetailsDescriptionContainer centerElements"
      >
        <i class="fa-solid fa-align-left" style="padding: 1rem"></i>
        <p class="eventDetailsDescription">{{ selectedEvent.description }}</p>
      </div>
      <div class="eventDetailsButtonsContainer">
        <button
          class="eventDetailsButton delete"
          @click="deleteEvent(selectedEvent.id)"
        >
          <i class="fa-solid fa-trash-can"></i> Eliminar actividad
        </button>
        <button class="eventDetailsButton cancel" @click="selectedEvent = null">
          Cerrar
        </button>
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
} from "date-fns";

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
    babiesList() {
      return this.registeredBabies;
    },
    categoriesList() {
      return this.categories;
    },
    proritiesList() {
      return this.priorities;
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
        this.isNewEventPopupOpen = true;
      }
    },
    saveEvent() {
      const selectedCategory = this.eventCategory;
      const selectedPriority = this.eventPriority;
      const selectedBaby = this.eventBaby;

      const event = {
        id: this.events.length + 1,
        date: format(this.selectedDate, "yyyy-MM-dd"),
        title: this.eventName,
        description: this.eventDescription,
        category: selectedCategory.name,
        priority: selectedPriority.name,
        babie: selectedBaby.name,
        categoryColor: selectedCategory.color,
        priorityColor: selectedPriority.color,
        time: this.eventTime,
      };
      this.events.push(event);

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
        .filter((event) => event.date === formattedDate)
        .map((event) => ({
          ...event,
          color: this.getCategoryColor(event.category),
        }));
    },
    getCategoryColor(categoryName) {
      const category = this.categories.find(
        (category) => category.name === categoryName
      );
      return category ? category.color : "";
    },
    viewEvent(event) {
      this.selectedEvent = event;
    },
    deleteEvent(eventId) {
      // Modificar a futuro para enviar a eliminar a BD
      this.events = this.events.filter((event) => event.id !== eventId);
      this.selectedEvent = null;
    },
  },
  mounted() {
    // Obtener los datos de la BD para llenar el select de los bebes
    this.registeredBabies = [
      { id: 1, name: "Brian G" },
      { id: 2, name: "Juanito D" },
      { id: 3, name: "Veronica S" },
    ];

    this.categories = [
      { id: "1", name: "Cita Médica", color: "#87bd40" },
      { id: "1", name: "Tratamiento", color: "#4081bd" },
      { id: "1", name: "Personal", color: "#7e40bd" },
    ];

    this.priorities = [
      { id: "1", name: "Prioridad alta", color: "#D15353" },
      { id: "2", name: "Prioridad media", color: "#ffbf00" },
      { id: "3", name: "Prioridad baja", color: "#87bd40" },
    ];
  },
};
</script>
