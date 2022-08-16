function objToArray(value) {
	if (typeof value !== 'object') {
		throw new Error('Not a valid object');
	}

	return Object.keys(value).map((key) => value[key]);
}

exports.objToArray = objToArray;
