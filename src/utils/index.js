/**
 * @description 公共工具包
 * @author TomDiary
 * @link https://github.com/tomdiary
 */

/**
 * 计算颜色
 * @param color1
 * @param color2
 * @param weight
 * @link https://juejin.cn/post/7024025899813044232
 * @return {`#${number}${number}${number}`}
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
