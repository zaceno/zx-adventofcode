import fs from "fs"

const replacers = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
}

const process = str => {
  const decoded = Object.entries(replacers).reduce((str, [f, r]) => {
    return str.replaceAll(f, r)
  }, str)
  const digitString = decoded.replaceAll(/[a-z]/g, "")
  const digits = digitString.split("")
  const first = digits[0]
  const last = digits[digits.length - 1]
  return +(first + last)
}

const input = fs.readFileSync("./input", "utf-8").split("\n")
const result = input.map(process).reduce((tot, val) => tot + val)
console.log(result)
