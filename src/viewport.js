import { uuidv4 } from './utils.js'

export default class Viewport {
  constructor() {
    this.$el = this.createElement()
    this.$el.dataset.viewportId = uuidv4()
  }

  createElement() {
    const $el = document.createElement('div')
    $el.classList.add('viewport')
    return $el
  }
}
