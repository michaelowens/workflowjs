import WorkflowsJS, { DEFAULT_OPTIONS } from './WorkflowsJS.js'
import mockComponents from './mocks/components.js'

/** @type {DEFAULT_OPTIONS} */
const options = {}
const app = new WorkflowsJS(document.querySelector('#app'), options)
app.components.push(...mockComponents())
app.run()

// Example buttons changing positions
document.querySelector('#moveA').addEventListener('click', e => {
  app.components.find(component => component.name === 'A').position.x = 5
  app.components.find(component => component.name === 'A').position.y = 5
})

document.querySelector('#moveB').addEventListener('click', e => {
  app.components.find(component => component.name === 'B').position.x = 3
  app.components.find(component => component.name === 'B').position.y = 5
})
