<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  }
})

const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.iconClass) {
    return `svg-icon icon-${props.iconClass}`
  }
  return 'svg-icon'
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  vertical-align: 0;
  fill: currentColor;
  overflow: hidden;
  margin-right: 0;
}
</style>
