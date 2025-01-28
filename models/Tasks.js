const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

tasksSchema.index({
  content: 'text',
});

module.exports = mongoose.model('Tasks', tasksSchema);