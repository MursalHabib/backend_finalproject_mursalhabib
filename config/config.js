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
		username: process.env.PROD_PG_USERNAME,
		password: process.env.PROD_PG_PASSWORD,
		database: process.env.PROD_PG_DATABASE,
		host: process.env.PROD_PG_HOST,
		port: process.env.PROD_PG_PORT,
		dialect: process.env.PROD_PG_DIALECT,
	},
};
