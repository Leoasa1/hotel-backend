const express = require('express');
const router = express.Router();
const { roomModel, BedTypes, RoomTypes } = require('../models/Room');
const { bookingModel } = require('../models/Booking');
const { objToArray } = require('../utils/object-to-array');

function mapRoomsByType(rooms) {
	return objToArray(RoomTypes).reduce((acc, curr) => {
		const roomsByType = rooms.filter((room) => room.room_type === curr);

		if (roomsByType.length) {
			acc[curr] = {
				room: roomsByType[0],
				availability: roomsByType.length,
			};
		}

		return acc;
	}, {});
}

function mapRoomsByBedType(rooms) {
	return objToArray(BedTypes).reduce((acc, curr) => {
		const roomsByBed = rooms.filter((room) => room.bed === curr);

		if (roomsByBed.length) {
			acc[curr] = {
				rooms: mapRoomsByType(roomsByBed),
				availability: roomsByBed.length,
			};
		}

		return acc;
	}, {});
}

router.get('/search', async (req, res) => {
	const { checkin, checkout } = req.query;

	if (!checkin || !checkout) {
		throw new Error('Valid checkin, checkout dates are required.');
	}

	try {
		const bookings = await bookingModel
			.find({
				check_in: {
					$gte: checkin,
				},
				check_out: {
					$lte: checkout,
				},
			})
			.exec();

		const rooms = await roomModel.find({
			_id: {
				$nin: !!bookings ? bookings.map((booking) => booking.room) : [],
			},
		});

		res.status(200).json({
			rooms: mapRoomsByBedType(rooms),
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
