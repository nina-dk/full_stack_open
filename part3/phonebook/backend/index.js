require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Contact = require("./models/contact");

const app = express();
const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(express.json());

morgan.token("data", (req, _) => {
  return (["POST", "PUT"].includes(req.method)) ? JSON.stringify(req.body) : null;
});

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res)
  ].join(' ')
}));

app.get("/api/persons", (_, res, next) => {
  Contact.find({}).then(contacts => res.json(contacts))
                  .catch(next);
});

app.get("/api/info", (_, res, next) => {
  Contact.find({}).then(contacts => {
    res.write(`<p>The phonebook has info for ${contacts.length} people.</p>`);
    res.write(`<p>${new Date()}</p>`);
    res.end();
  })
  .catch(next);
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      console.log("shouldn't see this");
      if (!contact) response.status(404).end();
      res.json(contact);
    })
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  let data = req.body;

  if (!data.name || !data.number) {
      res.statusMessage = "Name and number are required.";
      return res.status(400).json({ error: "name and number required fields" });
  }

  Contact.find({ name: data.name }).then(contact => {
    if (contact.length > 0) {
      res.statusMessage = `${data.name} is already a registered contact.`;
      return res.status(400).json({ error: "name must be unique" });
    } else {
      let newContact = new Contact({
        name: data.name,
        number: data.number
      });
    
      newContact.save().then(_ => {
        res.statusCode = 201;
        res.json(newContact);
        console.log(`Added ${newContact.name} ${newContact.number} to the phonebook.`);
      }).catch(next);
    }
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(_ => {
      res.sendStatus(204).end();
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndUpdate(req.params.id, { number: req.body.number }, {
    runValidators: true, context: "query"
  })
    .then(contact => {
      if (!contact) return res.status(404).send({ error: "contact not found" });

      res.sendStatus(204).end();
    })
    .catch(next);
});

// handler of requests with unknown endpoint
app.use((_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

app.use((error, _, res, _next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is app and running on port ${PORT}`));