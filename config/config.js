require("dotenv").config();

module.exports = {
	development: {
		username: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: process.env.PG_DIALECT,
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "postgres",
		password: "uljcvKNwUUbYLcBzQGAptiGHFUAYbblM",
		database: "railway",
		host: "meticulous-empathy.railway.internal",
		dialect: "postgres",
	},
};
