<template>
  <div id="submit-button"
    @click="clickedSubmit"
    class="submit-container"
    :class="{'disabled': disabled, 'error': error}">

    <div
        ref="submit-btn"
        :class="buttonClass"
        class="submit-btn">
      <span v-show="!clicked">
        {{ !error ? label : errorLabel }}
      </span>
      <span v-show="loaded && !error">✔</span>
      <span v-show="loaded && error">{{ errorLabel }}</span>
    </div>

    <!--  grey circle  -->
    <svg v-if="loading" class="loader-svg">
      <path stroke="#CCCCCC" fill="none" stroke-width="4" d="M25,2.5A22.5,22.5 0 1 1 2.5,25A22.5,22.5 0 0 1 25,2.5"></path>
    </svg>

    <!--  green circle  -->
    <!--  circumference  -->
    <!-- 3.1416 * 50 = ~157 -->
    <svg v-if="loading" class="loader-svg">
      <path stroke="#20BF7E" fill="none" stroke-width="4" d="M25,2.5A22.5,22.5 0 1 1 2.5,25A22.5,22.5 0 0 1 25,2.5" stroke-dasharray="157" :stroke-dashoffset="loaderOffset"></path>
    </svg>
  </div>
</template>

<script>
import { TweenLite, Power2 } from 'gsap/TweenMax'

const circumference = 157

export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Submit'
    },
    errorLabel: {
      type: String,
      default: 'Retry'
    }
  },
  data () {
    return {
      clicked: false,
      loading: false,
      loaded: false,
      loaderOffset: circumference
    }
  },
  methods: {
    clickedSubmit () {
      if (this.disabled) {
        return
      }
      if (!this.error && this.clicked) {
        // button is loading
        return
      }

      if (this.error) {
        this.restart()
      }

      // start loading animation
      this.clicked = true

      // when css transition ends, execute animateLoader method
      this.$refs['submit-btn'].addEventListener('transitionend',
        this.animateLoader, false)
      this.$emit('click')
    },
    animateLoader () {
      this.loading = true
      // remove transition end event listener
      this.$refs['submit-btn'].removeEventListener('transitionend',
        this.animateLoader, false)
      this.$emit('ready')
    },
    completeLoading () {
      this.loading = false
      this.loaded = true
      this.$refs['submit-btn'].addEventListener('transitionend',
        this.finishedAnimation, false)
    },
    finishedAnimation () {
      this.$refs['submit-btn'].removeEventListener('transitionend',
        this.finishedAnimation, false)

      if (!this.error) {
        // emit only when successfully uploaded
        this.$emit('success')
      }
    },
    restart () {
      this.clicked = false
      this.loaded = false
      this.loading = false
      this.loaderOffset = circumference
    }
  },
  watch: {
    progress () {
      if (this.loading) {
        const clampedProgress = Math.max(Math.min(this.progress, 1), 0)
        const offset = circumference - (clampedProgress * circumference)
        let time = 2
        const props = {
          loaderOffset: offset,
          ease: Power2.easeInOut
        }
        if (clampedProgress === 1) {
          // finished loading
          props.onComplete = this.completeLoading
          time = 0.2
        }
        TweenLite.to(this, time, props)
      }
    },
    error () {
      if (this.loading) {
        this.completeLoading()
      }
    }
  },
  computed: {
    buttonClass () {
      if (this.loaded) {
        return 'loaded'
      }

      if (this.clicked) {
        return 'round'
      }

      return ''
    }
  }
}
</script>

<style scoped>
.submit-container {
  position: relative;
  margin: 80px;
}

.submit-btn {
  width: 100px;
  color: #20BF7E;
  font-size: 20px;
  font-family: Arial;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px 10px 20px;
  border: solid #20BF7E 4px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 25px;
  transition: width .3s, margin .3s, background-color .3s, color .3s;
}

.submit-btn:hover {
  background-color: #20BF7E;
  color: white;
}

.submit-btn.round {
  margin-left: 50px;
  border-color: #CCCCCC;
  background: white;

  /*  circle should be 50px width & height */
  /* borderLeft + paddingLeft + paddingRight + borderRight  */
  /* 4 + 20 + 20 + 4 = 48 + 2 = 50 */
  width: 2px;
  /* borderTop + paddingTop + paddingBottom + borderBottom  */
  /* 4 + 10 + 10 + 4 = 28 + 22 = 50 */
  height: 22px;
  pointer-events: none;
}
.submit-btn.loaded {
  color: white;
  background-color: #20BF7E;
  pointer-events: none;
}

.loader-svg {
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 50px;
  width: 50px;
  height: 50px;
  transform-origin: 25px 25px 25px;
}

.error .submit-btn {
  cursor: pointer;
  color: red;
  border-color: red;
}
.error .submit-btn:hover {
  background-color: red;
  color: white;
}
.error .submit-btn.loaded {
  color: white;
  background-color: red;
  pointer-events: auto;
}

.disabled .submit-btn {
  cursor: not-allowed;
  opacity: 0.7;
  color: gray;
  border-color: gray;
  transition: opacity .3s ease-out;
}
.disabled .submit-btn:hover {
  background-color: white;
  color: gray;
}
</style>
