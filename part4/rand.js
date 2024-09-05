const authors = [
  'Robert C. Martin',
  'Martin Fowler',
  'Kent Beck',
  'Eric Evans',
  'Uncle Bob',
  'Fowler',
  'Beck',
  'Evans',
  'Sandi Metz',
  'Michael Feathers',
]

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomObjects = () => {
  return Array.from({ length: 10 }, () => ({
    author: authors[getRandomInt(0, authors.length - 1)],
    blogs: getRandomInt(1, 10),
  }))
}

const randomObjectsArray = generateRandomObjects()

console.log(randomObjectsArray)
