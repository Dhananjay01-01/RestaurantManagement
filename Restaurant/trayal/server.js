const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database/database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, name TEXT, order TEXT)");
});

app.post('/submit-order', (req, res) => {
  const { name, order } = req.body;
  db.run("INSERT INTO orders (name, order) VALUES (?, ?)", [name, order], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: this.lastID, name, order });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
