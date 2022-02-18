<template>
  <div class="slider-card"
    @mousedown="emitMouseDown"
    @mouseup="emitMouseUp">
    <img :src="slide.image" :alt="slide.title" draggable="false">
  </div>
</template>

<script>
export default {
  props: {
    slide: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitMouseDown (e) {
      this.$emit('mousedown', e)
    },
    emitMouseUp (e) {
      this.$emit('mouseup', e)
    }
  }
}
</script>

<style scoped>
.slider-card {
  display: inline-block;
  background-color: grey;
  overflow: hidden;
  width: 260px;
  height: 360px;
  margin-right: 30px;
  border-radius: 12px;
  box-shadow:0px 60px 20px -20px rgba(0, 0, 0, 0.3)
}
.slider-card img {
  width: 100%;
}
</style>
