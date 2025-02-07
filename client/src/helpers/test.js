let arrays = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
]

let redArray = ["r1", "r2", "r3"]

let newArrays = [...arrays]
newArrays[1] = redArray

console.log(newArrays);
