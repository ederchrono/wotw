import StepsProgress from './index.vue'

const components = { StepsProgress }

export default { title: 'Steps progress' }

const cards = [
  {
    title: 'Phase 01',
    description: 'Project research and main component specifications.'
  },
  {
    title: 'Phase 02',
    description: 'Initial project requirements and initialization.'
  },
  {
    title: 'Phase 03',
    description: 'Design and basic bootstrap for all elements.'
  },
  {
    title: 'Phase 04',
    description: 'Final testing on various devices and platforms.'
  }
]

export const interactive = () => ({
  components,
  data () {
    return {
      currentStep: 0,
      cards
    }
  },
  methods: {
    goPrev () {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    goNext () {
      if (this.currentStep <= this.cards.length) {
        this.currentStep++
      }
    }
  },
  template: `
  <div>
    <steps-progress :currentStep="currentStep" :cards="cards"/>

    <div style="margin-top: 30px;">
      <button @click="goPrev">Prev</button>
      <button @click="goNext">Next</button>
      <p>step: {{currentStep}}</p>
    </div>
  </div>
  `
})
