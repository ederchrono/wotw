<template>
  <!--
    This component is only used for dev purposes.
    When working with a component this gets filled with it for
    hot module reload when using `yarn serve`
    The real widgets catalog can be seen running `yarn storybook`
  -->
  <div id="app">
    <!-- inster component to develop -->
    <smiley-toggle v-model="active"/>
  </div>
</template>

<script>
// import component to develop and add it to components
import SmileyToggle from './components/smiley-toggle'
export default {
  name: 'app',
  components: {
    SmileyToggle
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
