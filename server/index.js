const express = require("express");
const cors = require("cors");
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('expenses.db');
const app = express();
let expenses = [];
app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY,
    title TEXT,
    amount REAL,
    date TEXT
  )
`);

app.get("/api/hello", (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get("/api/expenses", (req, res) => {
    res.json(db.prepare("SELECT * FROM expenses").all());
});

app.post("/api/expenses", (req, res) => {
    const { title, amount, date } = req.body;
    const expenseDate = date || new Date().toISOString().slice(0, 10);
    res.json(db.prepare("INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)").run(title, amount, expenseDate));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});