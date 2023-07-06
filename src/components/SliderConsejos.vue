<template>
  <div class="slider-container">
    <button class="slider-button" @click="prevItem">
      <i class="fa-solid fa-circle-arrow-left slider-button-icon"></i>
    </button>

    <div class="slider-item">
      <div class="slider-image-container">
        <img
          :src="items[currentIndex].image"
          alt="Slider Image"
          class="slider-image"
        />
      </div>
      <div class="slider-content">
        <p class="slider-title">{{ items[currentIndex].title }}</p>
        <p class="slider-text">{{ items[currentIndex].description }}</p>
      </div>
    </div>

    <button class="slider-button" @click="nextItem">
      <i class="fa-solid fa-circle-arrow-right slider-button-icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          image: "img/Home-image-01.png",
          title: "Consejo 1.Prueba..",
          description:
            "Itaque pariatur inventore natus quaerat exercitationem quo in fugiat modi expedita dignissimos molestias ex tenetur voluptate temporibus, deleniti consequatur a tempore sed aliquam voluptas nostrum similique eligendi. Incidunt impedit porro itaque iure dolor laudantium laborum, esse ipsum exercitationem ducimus blanditiis optio sapiente eligendi, modi, architecto et pariatur quasi quidem at iusto minus ut hic ullam nulla. Cumque rerum voluptatibus atque ex porro quod veniam nihil? Tempora dolor quasi necessitatibus eligendi consequuntur corrupti sunt, mollitia animi voluptate libero, vel quidem labore laborum veritatis quaerat pariatur aut facilis odio, alias incidunt dolorum nam! Non molestias blanditiis praesentium dolorum exercitationem ad ex dolore quibusdam quis libero! Voluptates quod aspernatur quos corporis consequuntur.",
        },
        {
          image: "img/Home-image-02.png",
          title: "Consejo 2 Prueba...",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores totam quibusdam veritatis, aut id accusamus cumque tempora incidunt magni sunt non quos? Consequatur, ratione? Eos ut voluptate ex quae culpa unde, ipsa iure corrupti aliquid sint autem fugiat quos odit libero earum, tenetur eligendi! Repudiandae provident maiores esse quam, et, explicabo similique accusamus mollitia impedit corporis earum. Officiis aperiam animi quia nostrum nesciunt totam repellendus unde laudantium nisi quam, adipisci maiores assumenda, repellat in ea suscipit delectus aliquam impedit quidem deleniti hic dolorum aspernatur! Minima temporibus non autem quos voluptates officiis, omnis nostrum, earum nulla quaerat ipsum recusandae consequuntur quae?",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextItem() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex++;
      }
    },
  },
};
</script>

<style></style>
