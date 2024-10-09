const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a user (POST)
router.post('/', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, address } = req.body;

  if (!firstName || !lastName || !phoneNumber || !email || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ firstName, lastName, phoneNumber, email, address });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user (PUT)
router.put('/:id', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, address } = req.body;
  
    try {
      // Check if the email already exists for another user
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        firstName, lastName, phoneNumber, email, address
      }, { new: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  
  

// Delete a user (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
