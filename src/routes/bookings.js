const express = require('express');
const router = express.Router();
const { roomModel } = require('../models/Room');
const { bookingModel } = require('../models/Booking');
const { guestModel } = require('../models/Guest');

// route    GET
// descr    Get Booking
// access   private
router.get('/', async (req, res) => {
	try {
		const booking = await bookingModel
			.find()
			.populate('guest')
			.populate('room');
		res.json(booking);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/', async (req, res) => {
	const {
		first_name,
		last_name,
		email,
		phone,
		room_type,
		bed,
		check_in,
		check_out,
	} = req.body;

	if (!check_in || !check_out) {
		throw new Error('Valid checkin, checkout dates are required.');
	}

	try {
		const bookings = await bookingModel
			.find({
				check_in: {
					$gte: check_in,
				},
				check_out: {
					$lte: check_out,
				},
			})
			.exec();

		const room = await roomModel.findOne({
			_id: {
				$nin: !!bookings ? bookings.map((booking) => booking.room) : [],
			},
			room_type: {
				$in: room_type,
			},
			bed: {
				$in: bed,
			},
		});

		let guest = await guestModel.findOne({ email });

		if (!guest) {
			guest = await guestModel.create({
				first_name,
				last_name,
				email,
				phone,
			});
		}

		booking = await bookingModel.create({
			room,
			guest,
			check_in,
			check_out,
		});

		res.status(200).send('Booking Created');
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
