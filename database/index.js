const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userProfile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('CONNECTED TO MONGO!');
});


module.exports = { conn };
