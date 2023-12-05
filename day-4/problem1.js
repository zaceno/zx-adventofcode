const str2Nums = str =>
  str
    .split(" ")
    .filter(x => !!x)
    .map(x => +x)
const parseCard = line => {
  const [identifier, data] = line.split(":")
  const [winning, numbers] = data.split("|")
  return [str2Nums(winning), str2Nums(numbers)]
}
const id = x => x
const sum = list => list.reduce((tot, x) => tot + x, 0)
const inList = list => num => list.includes(num)
const countMatches = (winning, numbers) =>
  numbers.map(inList(winning)).filter(id).length

const matchesToPoints = matches => {
  if (matches == 0) return 0
  if (matches == 1) return 1
  return 2 * matchesToPoints(matches - 1)
}

const lineToPoint = line => matchesToPoints(countMatches(...parseCard(line)))

async function run() {
  const input = await Bun.file("./input").text()
  const winnings = input.split("\n").map(lineToPoint)
  console.log(sum(winnings))
}
run()
