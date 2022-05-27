<template>
  <div class="cv-title" :class="titleSty">
    <div class="title-wrapper">
      <slot></slot>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'CV-ADMIN'
  },
  titleSty: {
    type: String,
    default: 'cv-title-style-1'
  }
})
</script>

<style scoped lang="scss">
.cv-title {
  font-size: 16px;
  font-weight: 600;
  color:#333;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  .title-wrapper {
    display: flex;
    align-items: center;

    span:nth-child(2) {
      margin-left: 4px;
    }
  }
}

.cv-title-style-1 {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 27px 0;
  grid-gap: 20px;
  align-items: center;
}

.cv-title-style-1::after, .cv-title-style-1::before {
  content: "";
  display: block;
  height: 5px;
  border-bottom: 1px solid #333333;
  border-top: 1px solid #333333;
  background-color: transparent;
}
</style>
