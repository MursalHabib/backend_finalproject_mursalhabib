class ValidationError extends Error {
	constructor(message = "Validation error") {
		super(message);
		this.statusCode = 400;
		this.name = "ValidationError";
	}
}

module.exports = ValidationError;
