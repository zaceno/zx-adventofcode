import fs from "fs"

const MAXRED = 12
const MAXGREEN = 13
const MAXBLUE = 14

const games = fs
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
  .filter(game => {
    return game.examples.reduce((possible, example) => {
      if (!possible) return false
      if (example.red > MAXRED) return false
      if (example.green > MAXGREEN) return false
      if (example.blue > MAXBLUE) return false
      return true
    }, true)
  })
  .map(game => game.id)
  .reduce((sum, id) => sum + id, 0)

console.log(games)
