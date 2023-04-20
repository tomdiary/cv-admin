/**
 * 动态设置主色/辅色
 * @param {!string} series 色系名称
 * @param {!string} target 色系颜色
 */
export const tsWeightColor = (series, target) => {
  const list = [
    { label: `--el-color-${series}-light-3`, target, source: '#FFFFFF', weight: 0.3 },
    { label: `--el-color-${series}-light-5`, target, source: '#FFFFFF', weight: 0.5 },
    { label: `--el-color-${series}-light-7`, target, source: '#FFFFFF', weight: 0.7 },
    { label: `--el-color-${series}-light-8`, target, source: '#FFFFFF', weight: 0.8 },
    { label: `--el-color-${series}-light-9`, target, source: '#FFFFFF', weight: 0.9 },
    { label: `--el-color-${series}-dark-2`, target, source: '#000000', weight: 0.2 }
  ]

  list.forEach(item => {
    document.body.style.setProperty(
      item.label,
      $bu.calculateWeightColor(item.target, item.source, item.weight)
    )
  })

  document.body.style.setProperty(`--el-color-${series}`, target)
}
