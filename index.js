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

// holds turtle state, e.g. coordiantes, pen-state, ...
const state = {}

// maps turtle-commands to js functions and tells the number of arguments
const internalFunctions = {
  forward: [fd, 1],
  fd: [fd, 1],
  back: [bk, 1,],
  bk: [bk, 1],
  left: [lt, 1],
  lt: [lt, 1],
  right: [rt, 1],
  rt: [rt, 1],
  penup: [pu, 0],
  pu: [pu, 0],
  pendown: [pd, 0],
  pd: [pd, 0],
}

// Event-Listeners

runButton.addEventListener('click', run)
resetButton.addEventListener('click', reset)

// Program

reset()
message(`Currently supported are ${Object.keys(internalFunctions).join(', ')}`, 'msg')

// Functions

function reset() {

  output.innerHTML = ''

  state.x = 500
  state.y = 500
  state.rotation = 0
  state.penDown = true

  turtle.style = `top: ${state.y - constants.turtleRadius}px; left:${state.x - constants.turtleRadius}px;`

  canvasCtx.clearRect(0, 0, 1000, 1000)
}

// this function does all the moving and drawing, all the others are just wrappers
function goto (x=state.x, y=state.y, rotation=state.rotation) {
  // 
  const hideturtle = x !== Math.min(1000, Math.max(0, x)) || y !== Math.min(1000, Math.max(0, y))

  if (state.penDown) {
    // Drawing the line
    canvasCtx.beginPath()
    canvasCtx.moveTo(state.x, state.y);
    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();
  }

  state.x = x
  state.y = y
  console.log(rotation)
  state.rotation = rotation % 360

  // Moving the turtle
  turtle.style = `top: ${state.y - constants.turtleRadius}px; left:${state.x - constants.turtleRadius}px; transform: rotate(${state.rotation}deg); ${hideturtle ? 'display: none' : ''}`

  console.log(state)
}

function fd (distance) {
  const x = state.x + (distance * Math.sin((state.rotation - 0) * Math.PI / 180))
  const y = state.y + (distance * Math.cos((state.rotation - 180) * Math.PI / 180))
  goto(x, y)
}

function bk (distance) {
  fd(-distance)
}

function lt (degrees) {
  goto(undefined, undefined, +state.rotation - +degrees)
}

function rt (degrees) {
  goto(undefined, undefined, +state.rotation + +degrees)
}

function message (msg, cl='') {
  const el = document.createElement('div')
  el.classList.add(cl)
  el.textContent = msg
  output.append(el)
}

function pu () {
  state.penDown = false
}

function pd () {
  state.penDown = true
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
      continue
    }

    message(`Don't know what to do with "${token}" on line ${line}`, 'error')
    break
  }
}

