const express = require('express');
const router = express.Router();
const { roomModel } = require('../models/Room');

router.get('/', async (req, res) => {
	try {
		const room = await roomModel.find();
		res.json(room);
		console.log('Got rooms');
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
