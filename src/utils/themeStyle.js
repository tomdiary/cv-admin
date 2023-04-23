/**
 * 动态设置主色/辅色
 * @param {!String} series 色系名称
 * @param {!String} target 色系颜色
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

/**
 * 动态设置标签视图颜色
 * @param {!String} target 色号
 */
export const tsTagsViewColor = (target) => {
  document.body.style.setProperty('--cv-tv-bg-color', target)
  document.body.style.setProperty(
    '--cv-tv-tag-bg-light-color',
    $bu.calculateWeightColor(target, '#FFFFFF', 0.7)
  )
  document.body.style.setProperty(
    '--cv-tv-tag-bg-dark-color',
    $bu.calculateWeightColor(target, '#000000', 0.2)
  )
}

/**
 * 动态设置侧边栏菜单颜色
 * @param {!Object} data 色系数据
 */
export const tsSidebarColor = (data) => {
  const {
    Cv_Sidebar_Bg_Color,
    Cv_Sidebar_Font_Color,
    Cv_Sidebar_Font_Active_Color,
    Cv_Sidebar_Font_Hover_Color,
    Cv_Sidebar_Icon_Color,
    Cv_Sidebar_Icon_Active_Color,
    Cv_Sidebar_Icon_Hover_Color,
    Cv_Sidebar_Width,
    Cv_Sidebar_Min_Width,
    Cv_Sidebar_Height,
  } = data

  document.body.style.setProperty('--cv-sidebar-bg-color', Cv_Sidebar_Bg_Color)
  document.body.style.setProperty('--cv-sidebar-font-color', Cv_Sidebar_Font_Color)
  document.body.style.setProperty('--cv-sidebar-font-active-color', Cv_Sidebar_Font_Active_Color)
  document.body.style.setProperty('--cv-sidebar-font-hover-color', Cv_Sidebar_Font_Hover_Color)
  document.body.style.setProperty('--cv-sidebar-icon-color', Cv_Sidebar_Icon_Color)
  document.body.style.setProperty('--cv-sidebar-icon-active-color', Cv_Sidebar_Icon_Active_Color)
  document.body.style.setProperty('--cv-sidebar-icon-hover-color', Cv_Sidebar_Icon_Hover_Color)
  document.body.style.setProperty('--cv-sidebar-width', Cv_Sidebar_Width)
  document.body.style.setProperty('--cv-sidebar-min-width', Cv_Sidebar_Min_Width)
  document.body.style.setProperty('--cv-sidebar-height', Cv_Sidebar_Height)
}
