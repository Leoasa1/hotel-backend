const mongoose = require('mongoose');
const { GUEST_MODEL_NAME } = require('./Guest');
const { ROOM_MODEL_NAME } = require('./Room');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: ROOM_MODEL_NAME,
		required: true,
	},
	guest: {
		type: mongoose.Schema.Types.ObjectId,
		ref: GUEST_MODEL_NAME,
		required: true,
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

exports.bookingModel = mongoose.model('booking', bookingSchema);
