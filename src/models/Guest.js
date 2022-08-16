const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GUEST_MODEL_NAME = 'guest';

const guestSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

exports.GUEST_MODEL_NAME = GUEST_MODEL_NAME;
exports.guestModel = mongoose.model(GUEST_MODEL_NAME, guestSchema);
