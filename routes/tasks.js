const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tasks = require('../models/Tasks');

// Create task
router.post('/', auth,  async (req, res) => {
  try {
    const { content } = req.body;

    const task = new Tasks({
      content,
      userId: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    let user = { userId: req.user._id };
    const tasks = await Tasks.find(user).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const update = {
      content,
      updatedAt: Date.now()
    };

    const task = await Tasks.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      update,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
