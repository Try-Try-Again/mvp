const path = require('path');

const express = require('express');
const db = require('../database/');
const User = require('./controllers/user.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/profiles', (req, res) => {
  User.find(req.connection.remoteAddress, (err, result) => {
    if (err) {
      res.send(err).status(400);
    } else {
      res.send(result);
    }
  });
});


app.post('/profiles', (req, res) => {
  console.log('CREATING NEW USER');
  res.send('CREATING NEW USER\n');
});

app.put('/profiles', (req, res) => {
  console.log('UPDATING USER');
  res.send('UPDATING USER\n');
});

// app.delete('/profiles', (req, res) => {
//   User.remove(req.connection.remoteAddress);
//   res.send('DELETING USER\n');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
