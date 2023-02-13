const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.use(express.json());

morgan.token("data", (req, _) => {
    return (req.method === "POST") ? JSON.stringify(req.body) : null;
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

app.get("/api/persons", (_, res) => {
    res.json(phonebook);
});

app.get("/api/info", (req, res) => {
    res.write(`<p>The phonebook has info for ${data.length} people.</p>`);
    res.write(`<p>${new Date()}</p>`)
    res.end();
});

app.get("/api/persons/:id", (req, res) => {
    let id = +req.params.id;
    let contact = phonebook.find(contact => contact.id === id);
    if (!contact) res.sendStatus(404).end();

    res.json(contact);
});

app.post("/api/persons", (req, res) => {
    const contactExists = () => phonebook.some(({name}) => name === data.name);
    let data = req.body;

    if (!data.name || !data.number) {
        res.statusMessage = "Name and number are required.";
        return res.status(400).json({ error: "name and number required fields" });
    } else if (contactExists()) {
        res.statusMessage = `${data.name} is already a registered contact.`;
        return res.status(400).json({ error: "name must be unique" });
    }

    let id = Math.floor(Math.random() * 10**10);
    phonebook.push({ ...data, id });
    res.sendStatus(201).end();
});

app.delete("/api/persons/:id", (req, res) => {
    let id = +req.params.id;
    phonebook = phonebook.filter(contact => contact.id !== id);
    res.sendStatus(204).end();
});

app.listen(PORT, () => console.log(`Server is app and running on port ${PORT}`));