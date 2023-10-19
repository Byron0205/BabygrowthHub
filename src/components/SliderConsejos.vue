<template>
    <div class="sliderContainer">
        <button class="sliderButton" @click="prevItem">
            <i class="fa-solid fa-circle-arrow-left sliderButtonIcon"></i>
        </button>
        <transition :name="getTransitionName()" mode="out-in">
            <div
                class="sliderItem"
                :key="currentIndex"
                v-if="consejos.length > 0"
            >
                <div class="sliderImgContainer">
                    <img
                        :src="consejos[currentIndex].imageUrl"
                        alt="Slider Image"
                        class="sliderImage"
                    />
                </div>
                <div class="sliderContent">
                    <p class="sliderTitle">
                        {{ consejos[currentIndex].titulo }}
                    </p>
                    <p class="sliderText">
                        {{ consejos[currentIndex].detalle }}
                    </p>
                </div>
            </div>
        </transition>

        <button class="sliderButton" @click="nextItem">
            <i class="fa-solid fa-circle-arrow-right sliderButtonIcon"></i>
        </button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            consejos: [],
            currentIndex: 0,
            isNext: true,
        };
    },
    methods: {
        prevItem() {
            if (this.currentIndex > 0) {
                this.isNext = false;
                this.currentIndex--;
            }
        },
        nextItem() {
            if (this.currentIndex < this.consejos.length - 1) {
                this.isNext = true;
                this.currentIndex++;
            }
        },
        getConsejos() {
            axios
                .get(`http://localhost:3000/recuperar-consejos`)
                .then((response) => {
                    this.consejos = response.data;
                })
                .catch((error) => {
                    console.error("Error al obtener los datos:", error);
                });
        },
        getTransitionName() {
            return this.isNext ? "slide-left" : "slide-right";
        },
    },
    mounted() {
        this.getConsejos();
    },
};
</script>

<style>
/* ANIMACIONES SLIDER*/
.sliderItem {
    position: relative;
}

.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-left-enter,
.slide-right-leave-to,
.slide-right-enter,
.slide-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-left-leave,
.slide-right-enter,
.slide-right-leave,
.slide-left-enter {
    opacity: 0;
    transform: translateX(-100%);
}
</style>
