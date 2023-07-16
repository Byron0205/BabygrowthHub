<template>
    <div class="select-age-container">
        <select class="input select-age" v-model="selectedDay">
            <option v-for="day in days" :key="day">{{ day }}</option>
        </select>

        <select class="input select-age" v-model="selectedMonth" @change="updateAvailableDays">
            <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
        </select>

        <select class="input select-age" v-model="selectedYear">
            <option v-for="year in years" :key="year">{{ year }}</option>
        </select>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            days: [],
            months: [],
            years: [],
            selectedDay: null,
            selectedMonth: null,
            selectedYear: null
        };
    },
    mounted() {
        // Llena los selects con los valores correspondientes
        this.fillMonths();
        this.fillYears();
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
        }
    },
    watch: {
        selectedMonth() {
            this.selectedDay = null;
        }
    },
    methods: {
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
                "Diciembre"
            ];
        },
        fillYears() {
            const currentYear = new Date().getFullYear();
            const startYear = currentYear - 100;
            for (let year = startYear; year <= currentYear; year++) {
                this.years.push(year);
            }
            this.years = this.years.reverse()
            
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
        }
    }
};
</script>
  