<template>
    <div>
        <div class="title-container">
            <div class="dashed-border">
                <h1 class="title">Dietas por edades del bebé</h1>
            </div>
        </div>
        <div class="navbar-diet">
            <div class="age-options-container">
                <div class="age-option" v-for="(ageRange, index) in ageRanges" :key="index"
                    :class="{ selected: selectedAgeRange === index }" @click="selectAgeRange(index)">
                    {{ ageRange }}
                </div>
            </div>
        </div>
        <div v-if="selectedAgeRange !== null">
            <div v-for="(diet, index) in selectedDiets" :key="diet.IDDieta"
                :class="{ 'diet-container': true, 'left': index % 2 === 0, 'right': index % 2 === 1 }">
                <h2 class="title-diet">{{ diet.Nombre }}</h2>
                <p class="diet-text">{{ diet.Detalles }}</p>
                
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "BabygrowthHubDietasView",

    data() {
        return {
            ageRanges: ["0 - 1 años", "1 - 2 años", "2 - 3 años", "3 - 4 años", "4 - 5 años"],
            selectedAgeRange: null,
            diets: [],
        };
    },

    computed: {
        ageRangeDiets() {
            const ageRangeDiets = {};

            this.diets.forEach((diet) => {
                const ageRangeKey = this.getAgeRange(diet.Edad);
                if (!ageRangeDiets.hasOwnProperty(ageRangeKey)) {
                    ageRangeDiets[ageRangeKey] = [];
                }
                ageRangeDiets[ageRangeKey].push(diet);
            });

            return ageRangeDiets;
        },
        selectedDiets() {
            if (this.selectedAgeRange !== null) {
                const ageRangeKey = this.getAgeRange(this.selectedAgeRange);
                return this.ageRangeDiets[ageRangeKey] || [];
            }
            return [];
        },
    },

    methods: {
        async fetchDietsFromAPI() {
            try {
                const response = await axios.get("http://localhost:3000/dietas");
                this.diets = response.data;
            } catch (error) {
                console.error("Error fetching diets from API:", error);
            }
        },

        selectAgeRange(index) {
            this.selectedAgeRange = index;
        },

        getAgeRange(ageIndex) {
            return `${ageIndex} - ${ageIndex + 1} años`;
        },
    },

    mounted() {
        this.fetchDietsFromAPI();
    },
};
</script>
  
<style lang="scss" scoped></style>
  