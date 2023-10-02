const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
	  name: {
		      type: String,
		      required: true,
		      trim: true,
		    },
	  location: {
		      type: String,
		      required: true,
		    },
	  description: String, // A brief description of the hotel
	  price: {
		      type: Number,
		      required: true,
		      min: 0, // Price should not be negative
		    },
	  rating: {
		      type: Number,
		      min: 0,
		      max: 5, // Rating should be between 0 and 5
		    },
	  // You can add more fields as needed, such as room types, amenities, and images.
	});
	module.exports = mongoose.model('Hotel', hotelSchema);
