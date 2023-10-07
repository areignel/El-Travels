const express = require('express');
const router = express.Router();

// Import the MySQL database connection (from your database.js or similar file)
const db = require('../database'); // Adjust the path to your database.js file

// Make a booking for a destination
router.post('/api/bookings', async (req, res) => {
  try {
    const { userId, destinationId } = req.body;

    // Check if the destination exists
    const destination = await getDestinationById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Check if the user exists
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the destination is available for booking (you can implement your own availability logic)
    const isAvailable = await isDestinationAvailable(destinationId);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Destination is not available for booking' });
    }

    // Create a booking record in the database
    const result = await createBooking(userId, destinationId);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Booking successful' });
    } else {
      res.status(500).json({ error: 'Failed to make a booking' });
    }
  } catch (err) {
    console.error('Error making a booking:', err);
    res.status(500).json({ error: 'Failed to make a booking' });
  }
});

// Get user bookings
router.get('/api/bookings/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await getUserBookings(userId);
    res.json(bookings);
  } catch (err) {
    console.error('Error getting user bookings:', err);
    res.status(500).json({ error: 'Failed to get user bookings' });
  }
});

// Helper function to check destination availability
async function isDestinationAvailable(destinationId) {
  // Implement your own availability logic here, e.g., check if destination is not fully booked
  return true;
}

// Helper functions to interact with the database
async function getDestinationById(destinationId) {
  const sql = 'SELECT * FROM destinations WHERE id = ?';
  const values = [destinationId];
  const [rows] = await db.promise().query(sql, values);
  return rows[0];
}

async function getUserById(userId) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const values = [userId];
  const [rows] = await db.promise().query(sql, values);
  return rows[0];
}

async function createBooking(userId, destinationId) {
  const sql = 'INSERT INTO bookings (user_id, destination_id) VALUES (?, ?)';
  const values = [userId, destinationId];
  return await db.promise().query(sql, values);
}

async function getUserBookings(userId) {
  const sql = 'SELECT * FROM bookings WHERE user_id = ?';
  const values = [userId];
  const [rows] = await db.promise().query(sql, values);
  return rows;
}

module.exports = router;

