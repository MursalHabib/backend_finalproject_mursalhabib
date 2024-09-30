exports.errorHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		error: err.name || "ServerError",
		message: err.message || "Internal server error",
	});
};
