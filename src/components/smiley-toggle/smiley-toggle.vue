<template>
  <div @click="toggle"
      @keyup.space="toggle"
      @keyup.enter="toggle"
      :aria-checked="isChecked"
      class="toggle-container"
      :class="{'disabled': disabled}"
      role="checkbox"
      tabindex="0">

    <!-- backgrounds active -->
    <div class="toggle-color-bg"></div>
    <!-- background inactive -->
    <div :class="{'fade': value}" class="toggle-gray-bg"></div>

    <!-- ball -->
    <div :class="{'active': value}" class="ball-face">
      <div class="faces-container">
        <div :class="{'active': value}" class="faces-together">

          <img class="happy-face" svg-inline width="25" src='./happy-face.svg' alt="sleepy face" />

          <img  class="sleepy-face" svg-inline width="25" src='./sleepy-face.svg' alt="sleepy face" />

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'smiley-toggle',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      if (this.disabled) {
        return
      }
      this.$emit('input', !this.value)
    }
  },
  computed: {
    isChecked () {
      return this.value ? 'true' : 'false'
    }
  }
}
</script>

<style scoped>
.toggle-container {
  position: relative;
  cursor: pointer;
  margin: 20px 0;
  outline:0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.toggle-gray-bg {
  background: #D4CFD0;
  width: 150px;
  height: 70px;
  margin-top: -70px;
  border-radius: 50px;
  transition: opacity .4s;
}
.toggle-gray-bg.fade {
  opacity: 0;
}
.toggle-color-bg {
  background: linear-gradient(to right, #E992EE, #EB92B3);
  width: 150px;
  height: 70px;
  border-radius: 50px;
}
.ball-face {
  position: absolute;
  overflow: hidden;
  left: 7px;
  top: 7px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  transition: left .4s ease-in-out;
  background: linear-gradient(45deg, #c6c6c6 0%,#ffffff 60%);
  box-shadow: -1px 3px 8px 0px rgba(0,0,0,0.2);
}
.ball-face.active {
  left: 87px;
}
.faces-container {
  position: relative;
}
.faces-together {
  position: absolute;
  transition: left .4s ease-in-out;
  left: 0;
}
.faces-together.active {
  left: 140px;
}
.happy-face {
  position: absolute;
  top: 18px;
  left: -120px;
  width: 25px;
}
.sleepy-face {
  position: absolute;
  top: 27px;
  left: 10px;
  width: 25px;
}
.disabled {
  cursor: not-allowed;
  opacity: 0.7;
  transition: opacity .3s ease-out;
}
</style>
