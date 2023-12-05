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

const matchesForCard = card => countMatches(...parseCard(card))

async function run() {
  const input = await Bun.file("./input").text()
  const cards = input.split("\n")
  const counts = cards.map(x => 1)
  cards.forEach((card, index) => {
    let matches = matchesForCard(card)
    for (let i = 1; i <= matches; i++) {
      counts[index + i] += counts[index]
    }
  })
  console.log(sum(counts))
}
run()
