import Component from '../Component.js'

export default function mockComponents(options = {}) {
  return [
    new Component('A', Object.assign({ position: { x: 1, y: 1 } }, options)),
    new Component('B', Object.assign({ position: { x: 3, y: 1 } }, options)),
  ]
}
