<template>
  <div v-if="shouldRender"
    class="slider-container"
    @mousemove="mouseMoving"
    @mouseleave="stopDrag">

    <div class="slider">
      <div class="slider-cards" :style="`transform: translate3d(${cardsX}px,0,0);`">

        <slider-card v-for="(slide, index) in slides" :key="index"
          :slide="slide"
          @mousedown="startDrag"
          @mouseup="stopDrag"
          />

      </div>

      <div class="slider-info">
        <h1>{{selectedSlide.title}}</h1>
        <p>{{selectedSlide.description}}</p>
        <button @click="clickedButton" class="slider-button">{{ buttonLabel }}</button>
      </div>

    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'
import SliderCard from './card-slider-card'

export default {
  components: {
    SliderCard
  },
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    buttonLabel: {
      type: String,
      default: 'BOOK'
    }
  },
  data () {
    return {
      selectedIndex: 0,
      dragging: false,
      initialMouseX: 0,
      initialCardsX: 0,
      cardsX: 0
    }
  },
  computed: {
    selectedSlide () {
      return this.slides[this.selectedIndex]
    },
    shouldRender () {
      return this.slides && this.slides.length
    }
  },
  methods: {
    startDrag (e) {
      this.dragging = true
      this.initialMouseX = e.pageX
      this.initialCardsX = this.cardsX
    },
    stopDrag () {
      this.dragging = false

      const cardWidth = 290
      const nearestSlide = -Math.round(this.cardsX / cardWidth)
      this.selectedIndex = Math.min(Math.max(0, nearestSlide), this.slides.length - 1)
      TweenLite.to(this, 0.3, { cardsX: -this.selectedIndex * cardWidth })
    },
    mouseMoving (e) {
      if (this.dragging) {
        const dragAmount = e.pageX - this.initialMouseX
        const targetX = this.initialCardsX + dragAmount
        this.cardsX = targetX
      }
    },
    clickedButton () {
      this.$emit('click', this.selectedIndex)
    }
  }
}
</script>

<style scoped>
.slider-container {
  overflow: hidden;
  background-color: #1F1140;
  width: 100%;
}
.slider {
  height: 640px;
  margin-left: 50%;
  transform: translate(-180px, 0);
  padding-top: 0.1em;
}

.slider-cards {
  position: relative;
  width: 900px;
  margin: 20px 50px;
  z-index: 1;
}

.slider-info {
  position: relative;
  overflow: hidden;
  background-color: white;
  margin-top: -200px;
  margin-left: 30px;
  padding: 200px 20px 0;
  width: 260px;
  height: 200px;
  text-align: center;
  border-radius: 8px;
}

.slider-info h1 {
  font-family: Arial Black, Gadget, sans-serif;
  line-height: 25px;
  font-size: 23px;
}
.slider-info p {
  font-family: Arial, Helvetica, sans-serif;
}

.slider-button {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
  border: none;
  color: white;
  background-color: #E71284;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
