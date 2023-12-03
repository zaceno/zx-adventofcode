import fs from "fs"

const MAXRED = 12
const MAXGREEN = 13
const MAXBLUE = 14

const sumpower = fs
  .readFileSync("./input", "utf-8")
  .split("\n")
  .map(str => {
    const [title, exampleStr] = str.split(": ")
    const id = +title.replace("Game ", "")
    const examples = exampleStr.split("; ").map(oneExampleStr =>
      oneExampleStr.split(", ").reduce(
        (example, part) => {
          const [number, color] = part.split(" ")
          return { ...example, [color]: +number }
        },
        { red: 0, green: 0, blue: 0 },
      ),
    )
    return { id, examples }
  })
  .map(game =>
    game.examples.reduce(
      (mins, example) => {
        let { red, green, blue } = mins
        if (example.red > red) red = example.red
        if (example.blue > blue) blue = example.blue
        if (example.green > green) green = example.green
        return { red, green, blue }
      },
      { red: 0, green: 0, blue: 0 },
    ),
  )
  .map(({ red, green, blue }) => red * green * blue)
  .reduce((sum, val) => sum + val, 0)

console.log(sumpower)
