const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	room_type: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	room_size: {
		type: Number,
		required: true,
	},
	bed: {
		type: String,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
	wifi: {
		type: Boolean,
		required: true,
	},
	accessibility: {
		type: Array,
		required: true,
	},
	entertainment: {
		type: Array,
		required: true,
	},
	bathroom: {
		type: Array,
		required: true,
	},
	food: {
		type: Array,
		required: true,
	},
});

module.exports = mongoose.model('room', roomSchema);