const errorHandler = (err, req, res, next) => {
	console.error(err);

	// Duplicate SKU
	if (err.code === 11000) {
		return res.status(409).json({
			success: false,
			error: {
				code: "DUPLICATE_SKU",
				message: "Product SKU already exists"
			}
		});
	}

	// Mongoose validation error
	if (err.name === "ValidationError") {
		return res.status(400).json({
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: err.message
			}
		});
	}

	// Default server error
	res.status(500).json({
		success: false,
		error: {
			code: "INTERNAL_SERVER_ERROR",
			message: "Something went wrong"
		}
	});
};

module.exports = errorHandler;
