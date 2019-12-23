import Component from './Component.js'
import Viewport from './Viewport.js'
import { generateGridBackground } from './Utils.js'

export const DEFAULT_OPTIONS = { debug: false, gridSize: 32, showGrid: true }

export default class WorkflowsJS {
  constructor($el, options = {}) {
    /** @type {HTMLElement} */
    this.$el = $el
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    /** @type {Component[]} */
    this.components = []
    this.viewport = new Viewport()
    if (this.options.showGrid) {
      this.viewport.$el.style.backgroundImage = `url(${generateGridBackground()})`
    }
    this.$el.appendChild(this.viewport.$el)

    return this
  }

  createDraggable(/** @type{Component} */ component) {
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
