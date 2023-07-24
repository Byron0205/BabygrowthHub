<template>
    <div>
        <div class="title-container">
            <div class="dashed-border">
                <h1 class="title">Etapas de desarrollo del bebé</h1>
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
            <div v-for="(developmentStage, index) in selectedDevelopmentStages" :key="developmentStage.IDetapa"
                :class="{ 'diet-container': true, 'left': index % 2 === 0, 'right': index % 2 === 1 }">
                <h2 class="title-diet">{{ developmentStage.titulo }}</h2>
                <p class="diet-text">{{ developmentStage.descripcion }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    name: "BabyGrowthHubDevelopmentView",

    data() {
        return {
            ageRanges: ["0 - 1 años", "1 - 2 años", "2 - 3 años", "3 - 4 años", "4 - 5 años"],
            selectedAgeRange: null,
            developmentStages: [],
        };
    },

    computed: {
        ageRangeDevelopmentStages() {
            const ageRangeDevelopmentStages = {};

            this.developmentStages.forEach((stage) => {
                const ageRangeKey = this.getAgeRange(stage.edad);
                if (!ageRangeDevelopmentStages.hasOwnProperty(ageRangeKey)) {
                    ageRangeDevelopmentStages[ageRangeKey] = [];
                }
                ageRangeDevelopmentStages[ageRangeKey].push(stage);
            });

            return ageRangeDevelopmentStages;
        },
        selectedDevelopmentStages() {
            if (this.selectedAgeRange !== null) {
                const ageRangeKey = this.getAgeRange(this.selectedAgeRange);
                return this.ageRangeDevelopmentStages[ageRangeKey] || [];
            }
            return [];
        },
    },

    methods: {
        async fetchDevelopmentStagesFromAPI() {
            try {
                const response = await axios.get("http://localhost:3000/etapa-desarrollo/");
                this.developmentStages = response.data;
            } catch (error) {
                console.error("Error fetching development stages from API:", error);
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
        this.fetchDevelopmentStagesFromAPI();
    },
};
</script>