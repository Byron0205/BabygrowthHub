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
              :class="{ calendarToday: isToday(day), isSelected: isSelected(day) }"
              @click="selectDate(day)"
            >
              <span>{{ day.day }}</span>
              <div
                v-for="event in getEventsForDate(day.date)"
                :key="event.title"
                class="calendarEvent"
                :style="{ backgroundColor: event.color }"
              >
                {{ event.title }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="createEventContainer" v-if="isPopupOpen">
      <div class="createEventContent">
        <div class="createEventHeader">
          <p>NUEVA ACTIVIDAD</p>
        </div>

        <div class="formCreateNewEvent">
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventName">Nombre Actividad</label>
            <input
              class="newEventInput"
              type="text"
              id="newEventName"
              v-model="eventName"
            />
          </div>
          <div class="newEventFlexContainer">
            <label class="newEventLabel" for="newEventDescription">Detalle:</label>
            <textarea class="newEventInput"
              id="newEventDescription"
              v-model="eventDescription"
            ></textarea>
          </div>
          <div class="newEventFlexContainer">
            <label for="newEventDate">Fecha:</label>
            <input type="text" id="newEventDate" v-model="eventDate" readonly />
          </div>
          <div>
            <label for="newEventCategory">Categoría:</label>
            <select id="newEventCategory" v-model="eventCategory">
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
