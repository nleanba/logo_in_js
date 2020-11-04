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

function reset() {
  state.x = 500
  state.y = 500
  state.rotation = 0
  state.penDown = true

  turtle.style.top = state.y - constants.turtleRadius
  turtle.style.left = state.x - constants.turtleRadius

  canvasCtx.clearRect(0, 0, 1000, 1000)
}

function fd(distance) {
  console.log(`moving ${distance}`);
}

function bk (distance) {
  fd(-distance)
}

const internalFunctions = {
  forward: [ fd, 1 ],
  fd: [ fd, 1 ],
  back: [ bk, 1, ],
  bk: [ bk, 1 ],
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
      for (let i = 0; i < internalFunctions[token][1] ; i++) {
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

