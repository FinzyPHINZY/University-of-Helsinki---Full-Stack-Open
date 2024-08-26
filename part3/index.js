require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require("./config/mongo.js");
const Contact = require("./contacts.js");

connectDB();

app.use(cors());

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
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Desc      Home Page
// Route     GET http://localhost:3001/
app.get("/", (req, res, next) => {
  try {
    res.send("Your PhoneBook");
  } catch (error) {
    next(error);
  }
});

// Desc      Phonebook Information
// Route     GET http://localhost:3001/info/
app.get("/info", (req, res, next) => {
  try {
    const date = new Date();

    res.send(
      `<div>
        <p>Phonebook has info for ${persons.length} people</p>
         <p>${date.toString()}</p> 
      </div>`
    );
  } catch (error) {
    next(error);
  }
});

// Desc      Phonebook Contacts
// Route     GET http://localhost:3001/api/persons/
app.get("/api/persons", (req, res, next) => {
  try {
    Contact.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  } catch (error) {
    next(error);
  }
});

// Desc      Person Contact
// Route     GET http://localhost:3001/api/persons/5
app.get("/api/persons/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    Contact.findById(id)
      .then((person) => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(400).send({ error: "malformatted id" });
      });
  } catch (error) {
    next(error);
  }
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

// Desc      Add new Contact
// Route     POST http://localhost:3001/api/persons
app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, number } = req.body;
    if (!name) {
      res.status(400).json({
        error: "name is missing",
      });
    } else if (!number) {
      res.status(400).json({
        error: "number is missing",
      });
    }

    const contact = new Contact({
      name,
      number,
    });

    try {
      const savedContact = await contact.save();

      res.status(201).json(savedContact);
    } catch (error) {
      next(error);
      res.status(400).json({ success: false, error });
    }
  } catch (error) {
    next(error);
  }
});

// Desc      Update Contact
// Route     PUT http://localhost:3001/api/persons:id
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const { id } = request.params;

  if (!name) {
    res.status(400).json({
      error: "name is missing",
    });
  } else if (!number) {
    res.status(400).json({
      error: "number is missing",
    });
  }

  const contact = {
    name,
    number,
  };

  Contact.findByIdAndUpdate(id, contact, { new: true, runValidators: true })
    .then((contact) => {
      response.json(contact);
    })
    .catch((error) => {
      next(error);
      console.error(error);
    });
});

// Desc      Delete Personnotes
// Route     DELETE http://localhost:3001/api/persons/5
app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Contact.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} ...betta go catch it`
  );
});
