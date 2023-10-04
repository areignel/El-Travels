const express = require('express');
const router = express.Router();

// Import the MySQL database connection (from your database.js or similar file)
const db = require('../database'); // Adjust the path to your database.js file

// Create a new destination
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO destinations (name, description) VALUES (?, ?)';
  const values = [name, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating destination:', err);
      res.status(500).json({ error: 'Failed to create destination' });
      return;
    }
    const createdDestination = {
      id: result.insertId,
      name,
      description,
    };
    res.status(201).json(createdDestination);
  });
});

// List all available destinations
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM destinations';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error listing destinations:', err);
      res.status(500).json({ error: 'Failed to list destinations' });
      return;
    }
    res.json(results);
  });
});

// Retrieve details about a specific destination
router.get('/:id', (req, res) => {
  const destinationId = req.params.id;
  const sql = 'SELECT * FROM destinations WHERE id = ?';
  const values = [destinationId];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error retrieving destination:', err);
      res.status(500).json({ error: 'Failed to retrieve destination' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Update an existing destination
router.put('/:id', (req, res) => {
  const destinationId = req.params.id;
  const { name, description } = req.body;
  const sql = 'UPDATE destinations SET name = ?, description = ? WHERE id = ?';
  const values = [name, description, destinationId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating destination:', err);
      res.status(500).json({ error: 'Failed to update destination' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    res.json({ message: 'Destination updated successfully' });
  });
});

// Delete a destination
router.delete('/:id', (req, res) => {
  const destinationId = req.params.id;
  const sql = 'DELETE FROM destinations WHERE id = ?';
  const values = [destinationId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting destination:', err);
      res.status(500).json({ error: 'Failed to delete destination' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    res.json({ message: 'Destination deleted successfully' });
  });
});

module.exports = router;

