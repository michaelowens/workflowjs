import { DEFAULT_OPTIONS } from './app.js'

/**
 * Limits how often a function can be called
 * @param {number} delay
 * @param {Function} fn
 * @param {number} lastCall
 */
export const throttle = (delay, fn, lastCall = 0) => (...args) => {
  const now = new Date().getTime()
  if (now - lastCall >= delay) {
    lastCall = now
    return fn(...args)
  }
}

/**
 * Generate a version 4 UUID
 * @return {string}
 */
export const uuidv4 = () =>
  // @ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

/**
 * Generates a square image with a border and returns the base64 data URL
 * @return {string}
 */
export function generateGridBackground(size = DEFAULT_OPTIONS.gridSize) {
  var canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  var ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#666'
  ctx.strokeRect(0, 0, size, size)
  // TODO: Fix this for Brave, toDataURL returns an empty string
  let dataUrl = canvas.toDataURL('image/png')

  if (!dataUrl) {
    console.error(
      'Could not generate grid background image, canvas returned empty data string'
    )
  }

  return dataUrl
}
