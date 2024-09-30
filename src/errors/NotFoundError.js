class NotfoundError extends Error {
	constructor(message = "Data not found") {
		super(message);
		this.statusCode = 404;
		this.name = "NotfoundError";
	}
}

module.exports = NotfoundError;
