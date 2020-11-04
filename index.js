const turtle = document.getElementById('turtle')
const input = document.getElementById('input')
const runButton = document.getElementById('run')
const resetButton = document.getElementById('reset')
const canvasCtx = document.getElementById('canvas').getContext("2d")

const constants = {
  turtleRadius: turtle.getBoundingClientRect().width / 2,
}

const state = {
  x: 500,
  y: 500,
  rotation: 0,
  penDown: true,
}

function initialize () {
  state.x = 500
  state.y = 500
  state.rotation = 0
  state.penDown = true

  turtle.style.top = state.y - constants.turtleRadius
  turtle.style.left = state.x - constants.turtleRadius
}

initialize()