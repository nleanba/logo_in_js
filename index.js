'use strict'

// Variables

const turtle = document.getElementById('turtle')
const input = document.getElementById('input')
const output = document.getElementById('output')
const runButton = document.getElementById('run')
const resetButton = document.getElementById('reset')
const canvasCtx = document.getElementById('canvas').getContext("2d")

const constants = {
  turtleRadius: turtle.getBoundingClientRect().width / 2,
}

const state = {}

const internalFunctions = {
  forward: [fd, 1],
  fd: [fd, 1],
  back: [bk, 1,],
  bk: [bk, 1],
}

// Event-Listeners

runButton.addEventListener('click', run)
resetButton.addEventListener('click', reset);

// Program

(() => {
  const msg = document.createElement('div')
  msg.classList.add('msg')
  msg.textContent = `Currently supported are "${Object.keys(internalFunctions).join('", "')}"`
  output.append(msg)
})()

reset()

// Functions

function reset() {

  const msg = document.createElement('div')
  msg.classList.add('msg')
  msg.textContent = `Resetting`
  output.append(msg)

  state.x = 500
  state.y = 500
  state.rotation = 180
  state.penDown = true

  turtle.style = `top: ${state.y - constants.turtleRadius}px; left:${state.x - constants.turtleRadius}px;`

  canvasCtx.clearRect(0, 0, 1000, 1000)
}

function moveTo(x, y) {
  if (state.penDown) {
    // Drawing the line
    canvasCtx.beginPath()
    canvasCtx.moveTo(state.x, state.y);
    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();
  }

  state.x = x
  state.y = y

  // Moving the turtle
  turtle.style = `top: ${state.y - constants.turtleRadius}px; left:${state.x - constants.turtleRadius}px;`
}

function fd(distance) {
  const x = state.x + (distance * Math.sin(state.rotation * Math.PI / 180))
  const y = state.y + (distance * Math.cos(state.rotation * Math.PI / 180))
  moveTo(x, y)
}

function bk(distance) {
  fd(-distance)
}

// Parser

function run() {
  const code = input.value.replace(/\n/g, ' \n ').split(' ')

  let line = 1

  while (code.length) {
    const token = code.shift()

    if (token === '') continue;
    if (token === '\n') {
      line++
      continue
    }

    if (Object.keys(internalFunctions).includes(token)) {
      const args = []
      for (let i = 0; i < internalFunctions[token][1]; i++) {
        args.push(code.shift())
      }
      internalFunctions[token][0](...args)
      continue;
    }

    const error = document.createElement('div')
    error.classList.add('error')
    error.textContent = `Don't know what to do with "${token}" on line ${line}`
    output.append(error)
  }
}

