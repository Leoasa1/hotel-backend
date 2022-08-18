const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { guestModel } = require('../models/Guest');
const auth = require('../../middleware/auth');

// route    GET
// descr    Get Guest
// access   private
router.get('/', auth, async (req, res) => {
	try {
		const guest = await guestModel.find();
		res.json(guest);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post(
	'/',
	[
		check('first_name', 'Name is required').not().isEmpty(),
		check('last_name', 'Lastname is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { first_name, last_name, email, phone } = req.body;

		try {
			// See if user exists
			let guest = await Guest.findOne({ email });

			if (guest) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Guest already exists',
						},
					],
				});
			}

			guest = new Guest({
				first_name,
				last_name,
				email,
				phone,
			});

			await guest.save();
			res.send('Guest registered');
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
