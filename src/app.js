const express = require("express");
const { sequelize } = require("../db/models/index");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use("/", require("./routes"));
app.get("/", (req, res) =>
	res.json({ message: "Welcome to Mursal Habib final project Backend" })
);

app.listen(PORT, async () => {
	console.log("SERVER UP: http://127.0.0.1:", +PORT);
});
