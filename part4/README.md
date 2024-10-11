Once we make the changes to the directory structure of our project, we will end up with the following structure:

├── index.js
├── app.js
├── dist
│ └── ...
├── controllers
│ └── notes.js
├── models
│ └── note.js
├── package-lock.json
├── package.json
├── utils
│ ├── config.js
│ ├── logger.js
│ └── middleware.js

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
Blog
.find({})
.then(blogs => {
response.json(blogs)
})
})

app.post('/api/blogs', (request, response) => {
const blog = new Blog(request.body)

blog
.save()
.then(result => {
response.status(201).json(result)
})
})

const PORT = 3003
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

tests/\*.test.js
