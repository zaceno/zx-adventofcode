import fs from "fs"

const result = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map(str => {
    const digits = str.replaceAll(/[a-z]/g, "").split("")
    return +(digits[0] + digits[digits.length - 1])
  })
  .reduce((tot, val) => tot + val, 0)
console.log(result)
