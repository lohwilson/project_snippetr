const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_ATLAS_URI || 'mongodb://localhost:27017/snippetr'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('MongoDB connection established:', mongoURI)
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const snippetrRouter = require('./routes/snippetr');

app.use('/users', usersRouter);
app.use('/snippetr', snippetrRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  });
}


app.listen(port, () => {
  console.log('server is running on port: ', port);
})


// generate random strong password
// require('crypto').randomBytes(64).toString('hex');
// add to heroku
