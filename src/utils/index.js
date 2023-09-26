/**
 * 公共工具包
 * @description 常用工具封装
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import config from '@/config'

/**
 * 计算颜色
 * @param color1
 * @param color2
 * @param weight
 * @link https://juejin.cn/post/7024025899813044232
 * @return {`#${string}${string}${string}`}
 */
export const calculateWeightColor = (color1, color2, weight) => {
  const calculateWeight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  let rColor = Math.round(r1 * (1 - calculateWeight) + r2 * calculateWeight)
  let gColor = Math.round(g1 * (1 - calculateWeight) + g2 * calculateWeight)
  let bColor = Math.round(b1 * (1 - calculateWeight) + b2 * calculateWeight)
  rColor = (`0${(rColor || 0).toString(16)}`).slice(-2)
  gColor = (`0${(gColor || 0).toString(16)}`).slice(-2)
  bColor = (`0${(bColor || 0).toString(16)}`).slice(-2)
  return `#${rColor}${gColor}${bColor}`
}

/**
 * 获取标题
 * @param {*} pageTitle
 * @returns {string}
 */
export const getPageTitle = (pageTitle) => (pageTitle ? `${pageTitle} - ${config.title}` : `${config.title}`)

/**
 * 检测颜色是否浅色
 * 只能检测 RBG 颜色，HSL、HSV 颜色需要转换成 RGB 格式。带透明的颜色也需要将其转换成不透明颜色，再进行检测。
 * @param color
 * @returns {boolean}
 */
export const isLightColor = color => {
  // 如果颜色以 # 开头，则去掉 #
  if (color.charAt(0) === '#') {
    color = color.substr(1)
  }
  // 解析颜色分量
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  // 计算相对亮度
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b
  // 返回相对亮度是否大于 0.5
  return L > 0.5
}
