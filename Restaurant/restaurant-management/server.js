const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure the database directory exists
if (!fs.existsSync('./database')) {
  fs.mkdirSync('./database');
}

// Connect to the database or create it if it doesn't exist
const db = new sqlite3.Database('./database/database.sqlite', (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create table with updated column name
  db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, name TEXT, order_item TEXT)");

  // Insert initial data if the table is empty
  db.get("SELECT COUNT(*) AS count FROM orders", (err, row) => {
    if (err) {
      console.error('Could not count rows', err);
    } else if (row.count === 0) {
      db.run("INSERT INTO orders (name, order_item) VALUES (?, ?)", ["Alice", "Pasta"]);
      db.run("INSERT INTO orders (name, order_item) VALUES (?, ?)", ["Bob", "Pizza"]);
      db.run("INSERT INTO orders (name, order_item) VALUES (?, ?)", ["Charlie", "Salad"]);
    }
  });
});

app.post('/submit-order', (req, res) => {
  const { name, order_item } = req.body;
  db.run("INSERT INTO orders (name, order_item) VALUES (?, ?)", [name, order_item], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ id: this.lastID, name, order_item });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
