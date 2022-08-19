const express = require('express');
const router = express.Router();
const { roomModel } = require('../models/Room');
const { bookingModel } = require('../models/Booking');
const { guestModel } = require('../models/Guest');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// route    GET
// descr    Get Booking
// access   private
router.get('/', auth, async (req, res) => {
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

// route    POST
// descr    Create Booking
// access   public
router.post(
	'/',
	[
		check('first_name', 'Name is required').not().isEmpty(),
		check('last_name', 'Lastname is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('phone', 'Phone is required').not().isEmpty(),
		check('check_in', 'check_in is required').not().isEmpty(),
		check('check_out', 'check_out is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
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

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if (!check_in || !check_out) {
			res.status(500).send('Server error');
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
					$nin: !!bookings
						? bookings.map((booking) => booking.room)
						: [],
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
	}
);

module.exports = router;
