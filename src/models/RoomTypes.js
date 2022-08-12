const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema({
	standard_double: {
		type: Number,
	},
	standard_queen: {
		type: Number,
	},
	standard_king: {
		type: Number,
	},
	premium_double: {
		type: Number,
	},
	premium_queen: {
		type: Number,
	},
	premium_king: {
		type: Number,
	},
});

module.exports = mongoose.model('roomType', roomTypeSchema);
