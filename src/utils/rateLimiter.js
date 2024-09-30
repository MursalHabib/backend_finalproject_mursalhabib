const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
	windowMs: 30 * 1000, // 30 seconds
	max: 5, // Limit each IP to 5 requests per `window` (here, per 30 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: "Too many requests, please try again after 30 seconds.",
});

module.exports = rateLimiter;
