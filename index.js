// Variables

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

// Event-Listeners

runButton.addEventListener('click', run)
resetButton.addEventListener('click', reset)

// Program

reset()

// Functions

function reset () {
  state.x = 500
  state.y = 500
  state.rotation = 0
  state.penDown = true

  turtle.style.top = state.y - constants.turtleRadius
  turtle.style.left = state.x - constants.turtleRadius

  canvasCtx.clearRect(0, 0, 1000, 1000)
}

function run () {
  const code = input.value.replace(/\n/g, ' ').split(' ')
  console.log(code)
}

function move (distance) {
  return;
}
