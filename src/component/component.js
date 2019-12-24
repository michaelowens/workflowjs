import { uuidv4 } from '../utils.js'
import { DEFAULT_OPTIONS } from '../app.js'
import {
  observable,
  observe,
} from '//unpkg.com/@nx-js/observer-util@4.2.2/dist/es.es6.js'

export default class Component {
  constructor(name = '', opts = {}) {
    this.name = observable(name)
    this.position = observable(opts.position || { x: 0, y: 0 })
    this.size = observable(opts.size || DEFAULT_OPTIONS.gridSize)

    this.$el = this.createElement()
    this.$el.dataset.componentId = uuidv4()

    this.startWatchers()

    return this
  }

  startWatchers() {
    observe(() => (this.$el.innerText = this.name))
    observe(() => this._updateSize(this.size))
    observe(() => this._updatePosition(this.position))
  }

  /** @param {number} size */
  _updateSize(size) {
    this.$el.style.height = `${size}px`
    this.$el.style.width = `${size}px`
  }

  /** @param {{x?: number, y?: number}} pos */
  _updatePosition(pos) {
    this.$el.style.left = `${pos.x * this.size}px`
    this.$el.style.top = `${pos.y * this.size}px`
  }

  createElement() {
    const $el = document.createElement('div')
    $el.classList.add('component')
    return $el
  }
}
