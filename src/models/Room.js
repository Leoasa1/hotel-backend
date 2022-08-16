const mongoose = require('mongoose');
const { objToArray } = require('../utils/object-to-array');

const Schema = mongoose.Schema;
const ROOM_MODEL_NAME = 'room';

const RoomTypes = {
	Standard: 'Standard',
	Premium: 'Premium',
};

const BedTypes = {
	King: 'King',
	Queen: 'Queen',
	Double: 'Double',
};

const roomSchema = new Schema({
	room_type: {
		type: String,
		enum: objToArray(RoomTypes),
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
		enum: objToArray(BedTypes),
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

exports.ROOM_MODEL_NAME = ROOM_MODEL_NAME;
exports.RoomTypes = RoomTypes;
exports.BedTypes = BedTypes;
exports.roomModel = mongoose.model(ROOM_MODEL_NAME, roomSchema);