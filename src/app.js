import Component from './component/component.js'
import Viewport from './viewport.js'
import { generateGridBackground } from './utils.js'

export const DEFAULT_OPTIONS = { debug: false, gridSize: 32, showGrid: true }

export default class App {
  /**
   * @param {HTMLElement} $el
   */
  constructor($el, options = {}) {
    this.$el = $el
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this.viewport = new Viewport()

    /** @type {Component[]} */
    this.components = []

    if (this.options.showGrid) {
      this.viewport.$el.style.backgroundImage = `url(${generateGridBackground()})`
    }
    this.$el.appendChild(this.viewport.$el)

    return this
  }

  /**
   * Attach drag & drop events to the given component
   *
   * @param {Component} component
   */
  createDraggable(component) {
    let moveEvent
    component.$el.addEventListener('mousedown', e => {
      component.$el.style.opacity = '0.4'

      document.addEventListener(
        'mousemove',
        (moveEvent = e => {
          let { top, left } = this.viewport.$el.getBoundingClientRect()
          let x = e.clientX - left
          let y = e.clientY - top
          component.position.x = Math.floor(x / this.options.gridSize)
          component.position.y = Math.floor(y / this.options.gridSize)
        })
      )
    })
    document.addEventListener('mouseup', e => {
      component.$el.style.opacity = '1'
      document.removeEventListener('mousemove', moveEvent)
      moveEvent = null
    })
  }

  run() {
    this.viewport.$el.innerHTML = ''
    this.components.forEach(component => {
      this.viewport.$el.appendChild(component.$el)
      this.createDraggable(component)
    })
  }
}
