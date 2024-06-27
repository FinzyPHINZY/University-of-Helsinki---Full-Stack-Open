const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Marie Poppendick",
    number: "39-23-6423122",
  },
];

morgan.token("req-body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

morgan.token("method", (req) => req.method);

morgan.token("url", (req) => req.url);

morgan.token("status", (req, res) => res.statusCode);
const customFormat =
  ":method :url :status :res[content-length] :response-time ms - :req-body";

app.set("trust proxy", true);

app.use(morgan(customFormat));

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Desc      Home Page
// Route     GET http://localhost:3001/
app.get("/", (req, res) => {
  res.send("Your PHoneBook");
});

// Desc      Phonebook Information
// Route     GET http://localhost:3001/info/
app.get("/info", (req, res) => {
  const date = new Date();

  res.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
         <p>${date.toString()}</p> 
      </div>`
  );
});

// Desc      Phonebook Contacts
// Route     GET http://localhost:3001/api/persons/
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Desc      Person Contact
// Route     GET http://localhost:3001/api/persons/5
app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === Number(id));

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

// Desc      Add new Contact
// Route     POST http://localhost:3001/api/persons
app.post("/api/persons", (req, res) => {
  const person = req.body;
  console.log(person);
  if (!person.name) {
    res.status(400).json({
      error: "name is missing",
    });
  } else if (!person.number) {
    res.status(400).json({
      error: "number is missing",
    });
  }

  const nameExists = persons.find((contact) => contact.name === person.name);
  if (nameExists) {
    return res.status(409).json({ error: "name must be unique" });
  }

  person.id = generateId();

  persons = persons.concat(person);
  console.log(persons);

  res.status(201).json(persons);
});

// Desc      Delete Person
// Route     DELETE http://localhost:3001/api/persons/5
app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const personIndex = persons.findIndex((person) => person.id === Number(id));

  if (personIndex !== -1) {
    persons = persons.filter((person) => person.id !== Number(id));

    res.status(204).send(persons);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} ...betta go catch it`
  );
});
