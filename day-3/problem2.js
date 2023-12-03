import fs from "fs"
const DIGITS = "0123456789".split("")
const schematic = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map(line => line.split(""))

// find each number and its coordinates
const numbers = []
let currentNumber = ""
let readingNumber = false
for (let row = 0; row < schematic.length; row++) {
  for (let col = 0; col < schematic[row].length; col++) {
    let char = schematic[row][col]
    if (readingNumber) {
      if (DIGITS.includes(char)) {
        currentNumber += char
      } else {
        readingNumber = false
        // Add number and coords to numberset
        numbers.push({
          number: currentNumber,
          row,
          col,
        })
      }
    } else {
      if (DIGITS.includes(char)) {
        currentNumber = char
        readingNumber = true
      } else {
      }
    }
  }
  if (readingNumber) {
    readingNumber = false
    numbers.push({
      number: currentNumber,
      row,
      col: schematic[row].length,
    })
  }
}

//from each number & coordinates, find the coordinates that would be a rectangle around that number
//...
const coordinates = numbers.map(({ number, row, col }) => {
  const coords = []
  coords.push([row, col])
  coords.push([row, col - number.length - 1])
  for (let i = 0; i < number.length + 2; i++) {
    coords.push([row - 1, col - i])
    coords.push([row + 1, col - i])
  }
  return { number, coords }
})

//find out if a coordinate pair is a star.

const isStar = pair => {
  const [row, col] = pair
  if (row < 0 || row >= schematic.length) return false
  const rowTokens = schematic[row]
  if (col < 0 || col >= rowTokens.length) return false
  const token = rowTokens[col]
  return token === "*"
}

/*
For each number, for each of its adjacent coordinates, check if it is a star. 
If it is, remember the number in a dict mapping star-coordinates to a list of numbers its adjacent to
*/

const starNumbers = {}
const addStarNumber = (pair, number) => {
  const [row, col] = pair
  const key = `${row}-${col}`
  if (key in starNumbers) {
    starNumbers[key].push(number)
  } else {
    starNumbers[key] = [number]
  }
}

coordinates.forEach(({ number, coords }) => {
  coords.forEach(pair => {
    if (isStar(pair)) {
      addStarNumber(pair, number)
    }
  })
})

// Now make a list of just the gears: having a numbers list exactly two long
// multiply those numbers to get gear rations. and add the gear-ratios to get result
const result = Object.values(starNumbers)
  .filter(numbers => numbers.length === 2)
  .map(([a, b]) => +a * +b)
  .reduce((tot, val) => tot + val, 0)

console.log(result)
