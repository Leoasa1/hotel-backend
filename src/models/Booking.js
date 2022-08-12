const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	room_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
	},
	guest_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Guest',
	},
	check_in: {
		type: Date,
		required: true,
	},
	check_out: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('booking', bookingSchema);
