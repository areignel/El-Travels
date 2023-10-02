// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travel_booking_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
