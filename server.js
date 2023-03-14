const express = require('express');
const routes = require('./src/app/routes/routes.js');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/', routes);

// Connect to MongoDB instance
mongoose.connect(process.env.DB_CONNECTION, {dbName: process.env.DATABASE});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to DB');
});

//Start the web server
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${port} ... `);
  }
});
