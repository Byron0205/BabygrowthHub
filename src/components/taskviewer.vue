<template>
  <div
    class="task"
    v-for="activity in activitiesDay"
    :key="activity.IDActividad"
  >
    <div class="info-task">
      <div class="info-left-task">
        <p class="task-name">{{ activity.Titulo }}</p>
        <p class="task-tag" :style="{ color: activity.CategoriaColor }">
          <i class="fa-solid fa-tag"></i>
          {{ activity.CategoriaNombre }}
        </p>
      </div>
      <div class="info-right-task">
        <p class="task-priority" :style="{ color: activity.colorPrioridad }">
          Prioridad {{ activity.nombrePrioridad }}
        </p>
        <div class="task-date">
          <i class="fa-solid fa-clock color" style="margin-top: 1.3rem;"></i>
          <p class="color">{{ formatDate(activity.Fecha) }}</p>
        </div>
      </div>
    </div>
    <div class="description-task " style="padding: 1rem;">
      <div>
        <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/icono-texto.svg" alt="label" />
      </div>
      <div class="description-task-text color">{{ activity.Detalle }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activitiesDay: [],
    };
  },
  methods: {
    getActivitiesDay(idAdulto) {
      axios
        .get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-actividades-dia/${idAdulto}`)
        .then((response) => {
          this.activitiesDay = response.data;
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
    }
  },
  mounted() {
    const idAdulto = localStorage.getItem('idAdulto');
    this.getActivitiesDay(idAdulto);
  },
};
</script>

<style></style>
