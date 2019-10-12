import SmileyToggle from './index.vue'

const components = { SmileyToggle }

export default { title: 'Smiley toggle' }

export const interactive = () => ({
  components,
  data () {
    return {
      active: false
    }
  },
  template: '<smiley-toggle v-model="active"/>'
})

export const disabledActive = () => ({
  components,
  data () {
    return {
      active: true
    }
  },
  template: '<smiley-toggle disabled :value="active"/>'
})

export const disabledInactive = () => ({
  components,
  data () {
    return {
      active: false
    }
  },
  template: '<smiley-toggle disabled :value="active"/>'
})
