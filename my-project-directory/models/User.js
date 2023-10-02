const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	  username: {
		      type: String,
		      required: true,
		      unique: true,
		      trim: true, // Remove whitespace from the beginning and end
		    },
	  email: {
		      type: String,
		      required: true,
		      unique: true,
		      trim: true,
		      lowercase: true, // Store emails in lowercase to ensure uniqueness
		    },
	  password: {
		      type: String,
		      required: true,
		    },
	  firstName: {
		      type: String,
		      required: true,
		    },
	  lastName: {
		      type: String,
		      required: true,
		    },
	  // You can add more fields as needed, such as user roles, profile picture URL, etc.
	});

	module.exports = mongoose.model('User', userSchema);
