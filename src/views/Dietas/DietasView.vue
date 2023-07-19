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
            <div v-for="(diet, index) in selectedDiets" :key="diet.title"
                :class="{ 'diet-container': true, 'left': index % 2 === 0, 'right': index % 2 === 1 }">
                <h2 class="title-diet">{{ diet.title }}</h2>
                <p class="diet-text">{{ diet.description }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "BabygrowthHubDietasView",

    data() {
        return {
            ageRanges: ["0 - 1 años", "1 - 2 años", "2 - 3 años", "3 - 4 años", "4 - 5 años"],
            selectedAgeRange: null,
            diets: [
                {
                    ageRange: 0,
                    title: "Dieta para bebés de 6 meses",
                    description:
                        "La dieta para bebés de 6 meses se basa principalmente en la introducción de alimentos sólidos complementarios a la leche materna o fórmula. Algunos alimentos recomendados incluyen puré de frutas, puré de verduras y cereales fortificados. Es importante consultar con el pediatra antes de iniciar la introducción de nuevos alimentos.",
                },
                {
                    ageRange: 1,
                    title: "Dieta para bebés de 6 meses (Otra dieta)",
                    description:
                        "Esta es otra dieta para bebés de 6 meses. Incluye diferentes opciones de alimentos y recetas recomendadas para esta etapa de desarrollo.",
                },
                {
                    ageRange: 0,
                    title: "Dieta para bebés de 9 meses",
                    description:
                        "La dieta para bebés de 9 meses se enfoca en la ampliación de la variedad de alimentos introducidos anteriormente. Se pueden agregar proteínas como carne molida, pollo desmenuzado o legumbres. También se pueden introducir alimentos con mayor textura para fomentar la masticación.",
                },
                {
                    ageRange: 0,
                    title: "Dieta para bebés de 9 meses (Otra dieta)",
                    description:
                        "Esta es otra dieta para bebés de 9 meses. Incluye diferentes opciones de alimentos y recetas recomendadas para esta etapa de desarrollo.",
                },
                {
                    ageRange: 0,
                    title: "Dieta para bebés de 9 meses (Otra dieta)",
                    description:
                        "Esta es otra dieta para bebés de 9 meses. Incluye diferentes opciones de alimentos y recetas recomendadas para esta etapa de desarrollo.",
                },
            ],
        };
    },

    computed: {
        ageRangeDiets() {
            const ageRangeDiets = [
                ["0-1 años", []],
                ["1-2 años", []],
                ["2-3 años", []],
                ["3-4 años", []],
                ["4-5 años", []],
            ];

            this.diets.forEach((diet) => {
                const ageRangeIndex = Math.min(diet.ageRange, ageRangeDiets.length - 1);
                ageRangeDiets[ageRangeIndex][1].push(diet);
            });

            return ageRangeDiets;
        },
        selectedDiets() {
            if (this.selectedAgeRange !== null) {
                return this.ageRangeDiets[this.selectedAgeRange][1];
            }
            return [];
        },
    },

    methods: {
        selectAgeRange(index) {
            this.selectedAgeRange = index;
        },
    },
};

</script>
  
<style lang="scss" scoped></style>
