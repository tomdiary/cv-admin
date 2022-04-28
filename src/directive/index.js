const modules = import.meta.globEager('./**/*.js')

export default function initDirective(app) {
  Object.keys(modules).forEach((key) => {
    if (!key.includes('./modules/')) return
    const fileName = key.split(/\s*(?:.\/modules\/|.js)\s*/)
    if (!key.includes(fileName[1]) || !fileName.length) return
    app.directive(fileName[1], { ...modules[key].default })
  })
}
