<template>
  <div v-if="shouldRender">
    <div class="container">
      <div class="progress-bg"></div>
      <div :style="barStyle" class="progress-bar"></div>
      <div :style="ballStyle" class="progress-ball"></div>

      <div v-for="(card, index) in cards"
          :key="index"
          class="card"
          :style="getCardColor(index + 1)"
          :class="getCardClass(index + 1)">
        <h3>{{card.title}}</h3>
        <p>{{card.description}}</p>
      </div>

    </div>
  </div>
</template>

<script>
const hslColorRed = {
  h: 5,
  s: 67,
  l: 45
}
export default {
  props: {
    currentStep: {
      type: Number,
      default: 0
    },
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    shouldRender () {
      if (this.totalSteps === 0) {
        return false
      }

      let valid = true
      this.cards.forEach(card => {
        if (!card.title) {
          valid = false
        }
      })
      return valid
    },
    totalSteps () {
      return this.cards ? this.cards.length : 0
    },
    barWidth () {
      const step = (100 / this.totalSteps)
      const stepHalf = step / 2

      // set width to match the center of the card
      const target = (step * this.currentStep) - stepHalf
      // keep width between 0 - 100
      const width = Math.max(Math.min(target, 100), 0)
      return `${width}%`
    },
    barStyle () {
      return {
        width: this.barWidth
      }
    },
    ballStyle () {
      const isVisible = this.currentStep && !this.allStepsDone
      const opacity = isVisible ? 1 : 0
      return {
        left: `calc(${this.barWidth} - 6px)`,
        opacity: opacity
      }
    },
    allStepsDone () {
      return this.currentStep > this.totalSteps
    }
  },
  methods: {
    getCardClass (cardIndex) {
      if (cardIndex === this.currentStep) {
        return 'active'
      }
      if (cardIndex < this.currentStep) {
        return 'done'
      }

      return ''
    },
    getCardColor (cardIndex) {
      // step not done yet
      if (cardIndex >= this.currentStep) {
        return
      }

      const { h, s, l } = hslColorRed
      if (this.allStepsDone) {
        return {
          backgroundColor: `hsl(${h}, ${s}%, ${l}%)`
        }
      }

      const lightnessRange = 15
      const step = (lightnessRange / this.currentStep) * cardIndex
      const newL = l + step
      return {
        backgroundColor: `hsl(${h}, ${s}%, ${newL}%)`
      }
    }
  }
}
</script>

<style scoped>
body {
  background-color: #B5AB9E;
}

.container {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  width: 100%;
  box-shadow:0px 20px 26px -10px rgba(0, 0, 0, 0.5);
}

.progress-bg {
  position: absolute;
  top: 60px;
  width: 100%;
  height: 5px;
  background-color: rgba(0,0,0,.1);
}
.progress-bar {
  position: absolute;
  top: 60px;
  width: 0;
  height: 5px;
  background-color: #B52A1C;
  transition: width 0.3s;
}
.progress-ball {
  position: absolute;
  top: 57px;
  left: calc(35% - 6px);
  border-radius: 50%;
  background-color: #B52A1C;
  width: 12px;
  height: 12px;
  transition: left 0.3s, opacity 0.3s;
}

.card {
  flex-grow: 1;
  padding: 0 10px;
  background-color: #FCF6EE;
  color: rgba(0,0,0,.3);
  font-family: Arial, Helvetica, sans-serif;
  min-height: 200px;
  transition: background-color 0.3s, color 0.3s;
}
.card h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display:block;
  width:100%;
  min-width:1px;
}
.card p {
  margin-top: 45px;
}

.card.done {
  background-color: #C13326;
  color: rgba(255, 255, 255, .6);
}

.card.active {
  color: rgba(0, 0, 0, .6);
}
</style>
