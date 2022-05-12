<template>
  <div id="default-echarts"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useLayoutStore from '@/store/layout'

const layoutState = useLayoutStore()
const echarts = ref(null)

onMounted(() => {
  initBaseData()
})

layoutState.$subscribe((newVal, oldVal) => {
  if (newVal.events.key === 'themeMode') initBaseData()
}, { detached: true })

const initBaseData = () => {
  if (echarts.value) echarts.value.dispose()
  echarts.value = $CvEcharts.init(document.getElementById('default-echarts'), layoutState.themeMode)

  echarts.value.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
}
</script>

<style scoped lang="scss">
#default-echarts {
  width: 500px;
  height: 500px;
}
</style>