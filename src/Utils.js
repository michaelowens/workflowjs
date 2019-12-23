import { DEFAULT_OPTIONS } from './WorkflowsJS.js'

export const throttle = (delay, fn, lastCall = 0) => (...args) => {
  const now = new Date().getTime()
  if (now - lastCall >= delay) {
    lastCall = now
    return fn(...args)
  }
}

/** @type {string} */
export const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

export function generateGridBackground(
  /** @type {number} */ size = DEFAULT_OPTIONS.gridSize
) {
  var canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  var ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#666'
  ctx.strokeRect(0, 0, size, size)

  return canvas.toDataURL('image/png')
}
