const baseSize = 16
function setRem() {
  const screenWidth = document.documentElement.clientWidth
  const scale = (screenWidth <= 1500 ? 1500 : screenWidth) / 1920
  document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`
}
setRem()
window.addEventListener('resize', () => {
  setRem()
})
