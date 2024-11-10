const express = require('express');
const router = express.Router();
const Configuration = require('../models/Configuration');
const User = require('../models/User');

// Create a new configuration (CREATE)
router.post('/create', async (req, res) => {
  const { userId, dimensions, useCase, bins } = req.body;

  try {
    const newConfiguration = new Configuration({
      userId,
      dimensions,
      useCase,
      bins,
    });

    const savedConfiguration = await newConfiguration.save();
    
    // Link configuration to the user
    await User.findByIdAndUpdate(userId, { $push: { configurations: savedConfiguration._id } });

    res.status(201).json(savedConfiguration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating configuration' });
  }
});

// Get configuration by ID (READ)
router.get('/:id', async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id);
    if (!configuration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    res.status(200).json(configuration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching configuration' });
  }
});

// Update configuration by ID (UPDATE)
router.put('/update/:id', async (req, res) => {
  const { dimensions, useCase, bins } = req.body;

  try {
    const updatedConfiguration = await Configuration.findByIdAndUpdate(
      req.params.id,
      { dimensions, useCase, bins },
      { new: true, runValidators: true }
    );
    if (!updatedConfiguration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    res.status(200).json(updatedConfiguration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating configuration' });
  }
});

// Delete configuration by ID (DELETE)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedConfiguration = await Configuration.findByIdAndDelete(req.params.id);
    if (!deletedConfiguration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    // Remove configuration reference from user
    await User.findByIdAndUpdate(deletedConfiguration.userId, { $pull: { configurations: req.params.id } });

    res.status(200).json({ message: 'Configuration deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting configuration' });
  }
});

// Get all configurations for a specific user (READ ALL)
router.get('/user/:userId', async (req, res) => {
  try {
    const configurations = await Configuration.find({ userId: req.params.userId });
    res.status(200).json(configurations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching configurations' });
  }
});

module.exports = router;