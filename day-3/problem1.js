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

// for each of those coordinates, check if there is a symbol at that place in the schematic.
const isSymbolAdjacent = pair => {
  const [row, col] = pair
  if (row < 0 || row >= schematic.length) return false
  const rowTokens = schematic[row]
  if (col < 0 || col >= rowTokens.length) return false
  const token = rowTokens[col]
  if (token === ".") return false
  if (DIGITS.includes(token)) return false
  return true
}

const hasSymbolAdjacent = coords =>
  coords.reduce((any, pair) => any || isSymbolAdjacent(pair), false)

const numbersAdjacentToSymbols = coordinates
  .filter(({ number, coords }) => hasSymbolAdjacent(coords))
  .map(({ number }) => +number)

const total = numbersAdjacentToSymbols.reduce((tot, num) => tot + num, 0)

console.log(total)
