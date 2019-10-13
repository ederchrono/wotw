<template>
  <!--
    This component is only used for dev purposes.
    When working with a component this gets filled with it for
    hot module reload when using `yarn serve`
    The real widgets catalog can be seen running `yarn storybook`
  -->
  <div id="app">
    <!-- inster component to develop -->
    <submit-loader-button
      :progress="loadProgress"
      :error="error"
      @click="reset"
      @ready="startLoading"
      @success="doSomething" />
  </div>
</template>

<script>
// import component to develop and add it to components
import SubmitLoaderButton from './components/submit-loader-button'
export default {
  name: 'app',
  components: {
    SubmitLoaderButton
  },
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
    },
    doSomething () {
      console.log('Successfully loaded')
    }
  }
}
</script>
