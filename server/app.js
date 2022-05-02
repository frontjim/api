const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
const Datastore = require('nedb');
const { response } = require('express');
const port = process.env.PORT || 3000;
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

const db = new Datastore('database.db');
db.loadDatabase();

app.get('/api', (req, res) => {
  db.find({}, (err, data) => {
    err ? res.end() : res.json(data);
  });
});

app.post('/api', (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  db.insert(data);
  res.json({
    status: 'success',
    data,
  });
});

app.listen(port, () => {
  console.log(`Listeling at ${port}`);
});
