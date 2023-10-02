const mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/mydatabase', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});     
