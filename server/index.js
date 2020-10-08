const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');
const app = express();
const PORT = 3004;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/campaign/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log('id', id);
  if (typeof id !== 'number') {
    res.status(400).send('invalid id, enter number');
  } else if (id > 100) {
    res.status(400).json({
      success: false,
      message: 'invalid id parameter'
    });
  } else {
    db.getDbData(id)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        console.log('error in /campaign request', err);
        res.setStatus(500);
      });
  }
});

app.get('/header/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log('id', id);
  if (typeof id !== 'number') {
    res.error('invalid id, enter number');
  }
  db.getDbData(id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log('error in /pledge-options request', err);
      res.setStatus(500);
    });
});

if (process.env.JEST_WORKER_ID === undefined) {
  app.listen(PORT, () => {
    console.log('listening at port', PORT);
  });
}
