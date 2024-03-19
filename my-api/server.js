const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/addItem', (req, res) => {
  const { name } = req.body;
  const sql = `INSERT INTO yorgan (name) VALUES ('${name}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error adding yorgan');
    } else {
      res.send('Yorgan added successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
