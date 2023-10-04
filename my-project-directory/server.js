const express = require('express');
const app = express();
const port = 3000; // You can change this to your preferred port number

// Import the destinations router
const destinationsRouter = require('./routes/destinations'); // Adjust the path as needed
// Sample data for destinations and bookings

// Use the destinations router for destination-related routes
app.use('/destinations', destinationsRouter);

const usersRouter = require('./routes/users'); // Adjust the path to your users.js file

// Use the users router for user-related routes
app.use('/users', usersRouter);

const bookingsRouter = require('./routes/bookings'); // Adjust the path to your bookings.js file

// Use the bookings router for booking-related routes
app.use('/bookings', bookingsRouter);

const destinations = [
  { id: 1, name: 'Paris', description: 'The City of Love' },
  { id: 2, name: 'New York', description: 'The Big Apple' },
  { id: 3, name: 'London', description: 'Historic and Modern' },
  { id: 4, name: 'Tokyo', description: 'Vibrant and High-Tech' },
  { id: 5, name: 'Rome', description: 'Eternal City of History' },
  { id: 6, name: 'Sydney', description: 'Harbor City Down Under' },
  { id: 7, name: 'Cairo', description: 'Home of the Pyramids' },
  { id: 8, name: 'Rio de Janeiro', description: 'The Marvelous City' },
  { id: 9, name: 'Dubai', description: 'City of Luxury' },
  { id: 10, name: 'Bali', description: 'Island Paradise' },
  { id: 11, name: 'Barcelona', description: 'Gaudi\'s Masterpieces' },
  { id: 12, name: 'Venice', description: 'City of Canals' },
  { id: 13, name: 'San Francisco', description: 'Bay Area Beauty' },
  { id: 14, name: 'Machu Picchu', description: 'Ancient Incan Ruins' },
  { id: 15, name: 'Istanbul', description: 'Where East Meets West' },
];

const bookings = [];

// Middleware to parse JSON requests
app.use(express.json());

// Route to list all destinations
app.get('/destinations', (req, res) => {
  res.json(destinations);
});

// Route to get details of a specific destination
app.get('/destinations/:id', (req, res) => {
  const destinationId = parseInt(req.params.id);
  const destination = destinations.find((d) => d.id === destinationId);
  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  res.json(destination);
});

// Route to make a booking
app.post('/bookings', (req, res) => {
  const { destinationId, name, email } = req.body;
  const destination = destinations.find((d) => d.id === destinationId);
  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' });
  }
  const booking = {
    destination,
    name,
    email,
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

