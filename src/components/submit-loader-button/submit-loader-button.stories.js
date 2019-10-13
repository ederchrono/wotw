import SubmitLoaderButton from './index.vue'

const components = { SubmitLoaderButton }

export default { title: 'Submit loader button' }

export const simulateLoading = () => ({
  components,
  data () {
    return {
      loadProgress: 0
    }
  },
  methods: {
    startLoading () {
      // simulate loading
      setTimeout(() => {
        this.loadProgress = 0.2
      }, 700)
      setTimeout(() => {
        this.loadProgress = 0.4
      }, 1000)
      setTimeout(() => {
        this.loadProgress = 0.7
      }, 1500)
      setTimeout(() => {
        this.loadProgress = 1
      }, 3000)
    }
  },
  template: '<submit-loader-button @ready="startLoading" :progress="loadProgress"/>'
})

export const simulateError = () => ({
  components,
  data () {
    return {
      loadProgress: 0,
      error: false
    }
  },
  methods: {
    reset () {
      this.error = false
    },
    startLoading () {
      // simulate loading
      setTimeout(() => {
        this.loadProgress = 0.2
      }, 700)
      setTimeout(() => {
        this.loadProgress = 0.4
      }, 1000)
      setTimeout(() => {
        this.loadProgress = 0.7
      }, 1500)
      setTimeout(() => {
        this.error = true
      }, 3000)
    }
  },
  template: '<submit-loader-button @click="reset" @ready="startLoading" :progress="loadProgress" :error="error"/>'
})

export const disabled = () => ({
  components,
  data () {
    return {
      active: true
    }
  },
  template: '<submit-loader-button disabled />'
})

export const errored = () => ({
  components,
  data () {
    return {
      error: true,
      loadProgress: 0
    }
  },
  methods: {
    reset () {
      this.error = false
    },
    startLoading () {
      // simulate loading
      setTimeout(() => {
        this.loadProgress = 0.2
      }, 700)
      setTimeout(() => {
        this.loadProgress = 0.4
      }, 1000)
      setTimeout(() => {
        this.loadProgress = 0.7
      }, 1500)
      setTimeout(() => {
        this.loadProgress = 1
      }, 3000)
    }
  },
  template: '<submit-loader-button @click="reset" @ready="startLoading" :error="error" :progress="loadProgress"/>'
})


export const erroredAndDisabled = () => ({
  components,
  data () {
    return {
      error: true,
      loadProgress: 0
    }
  },
  methods: {
    reset () {
      this.error = false
    },
    startLoading () {
      // simulate loading
      setTimeout(() => {
        this.loadProgress = 0.2
      }, 700)
      setTimeout(() => {
        this.loadProgress = 0.4
      }, 1000)
      setTimeout(() => {
        this.loadProgress = 0.7
      }, 1500)
      setTimeout(() => {
        this.loadProgress = 1
      }, 3000)
    }
  },
  template: '<submit-loader-button disabled @click="reset" @ready="startLoading" :error="error" :progress="loadProgress"/>'
})
