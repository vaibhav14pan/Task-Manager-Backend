require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const tasksRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(6000,'0.0.0.0', () => {
        console.log('Server running on http://0.0.0.0:6000');
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
  
module.exports = app;
