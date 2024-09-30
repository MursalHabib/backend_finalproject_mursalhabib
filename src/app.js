const express = require("express");
const helmet = require("helmet");
const { errorHandler } = require("./middleware/errorHandler");
const rateLimiter = require("./utils/rateLimiter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(rateLimiter);

app.use("/api/v1", require("./routes"));
app.get("/", (req, res) =>
	res.json({ message: "Welcome to Mursal Habib final project Backend" })
);

app.use(errorHandler);

app.listen(PORT, async () => {
	console.log("SERVER UP: http://127.0.0.1:", +PORT);
});
