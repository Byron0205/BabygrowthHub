<template>
  <div class="containter-calendario">
    <div class="header-calendario">
      <button class="next-button" @click="previousMonth">
        <i class="fa-solid fa-arrow-left calendario-button-icon"></i>
      </button>
      <p class="mes">{{ currentMonth }}</p>
      <button class="next-button" @click="nextMonth">
        <i class="fa-solid fa-arrow-right calendario-button-icon"></i>
      </button>
    </div>
    <div>
      <img class="img" src="../assets/img/Efecto-nube.png" alt="fondo nubes" />
    </div>
    <table class="tabla-calendario">
      <thead>
        <tr>
          <th class="nombre-dia-semana" v-for="day in daysOfWeek" :key="day">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar" :key="index">
          <td class="celdas-calendario" v-for="day in week" :key="day.date">
            <div
              :class="{ today: isToday(day), selected: isSelected(day) }"
              @click="selectDate(day)"
            >
              <span class="date">{{ day.day }}</span>
              <div
                v-for="event in getEventsForDate(day.date)"
                :key="event.title"
                class="event"
                :style="{ backgroundColor: event.color }"
              >
                {{ event.title }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="nuevo-evento" v-if="isPopupOpen">
      <div class="nuevo-evento-content">
        <div class="nuevo-evento-header">
          <p>NUEVA ACTIVIDAD</p>
        </div>

        <div class="nuevo-evento-contenido">
          <div class="nuevo-evento-flex-container">
            <label class="nuevo-evento-label" for="event-name">Nombre Actividad</label>
            <input
              class="nuevo-evento-input"
              type="text"
              id="event-name"
              v-model="eventName"
            />
          </div>
          <div class="nuevo-evento-flex-container">
            <label class="nuevo-evento-label" for="event-description">Detalle:</label>
            <textarea class="nuevo-evento-input"
              id="event-description"
              v-model="eventDescription"
            ></textarea>
          </div>
          <div class="nuevo-evento-flex-container">
            <label for="event-date">Fecha:</label>
            <input type="text" id="event-date" v-model="eventDate" readonly />
          </div>
          <div>
            <label for="event-category">Categoría:</label>
            <select id="event-category" v-model="eventCategory">
              <option
                v-for="category in categories"
                :key="category.name"
                :value="category"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <button @click="saveEvent">Guardar</button>
            <button @click="isPopupOpen = false">Cancelar</button>
          </div>
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
      isPopupOpen: false,
      eventDate: null,
      categories: [
        { name: "Cita Médica", color: "#87bd40" },
        { name: "Tratamiento", color: "#4081bd" },
        { name: "Personal", color: "#7e40bd" },
      ],
      eventCategory: null,
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
        this.isPopupOpen = true;
      }
    },
    saveEvent() {
      const selectedCategory = this.eventCategory;
      const event = {
        date: format(this.selectedDate, "yyyy-MM-dd"),
        title: this.eventName,
        description: this.eventDescription,
        category: selectedCategory.name,
        color: selectedCategory.color,
      };
      this.events.push(event);

      // Reset input values
      this.eventName = "";
      this.eventDescription = "";
      this.eventCategory = null;

      this.isPopupOpen = false;
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
  },
};
</script>
