"use strict";
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const filePath = path.resolve(__dirname, "../../data/movies.json");
		let movies = JSON.parse(fs.readFileSync(filePath, "utf8")).map((el) => {
			return {
				title: el.title,
				synopsis: el.synopsis,
				trailer_url: el.trailerUrl,
				img_url: el.imgUrl,
				rating: el.rating,
				status: el.status,
				created_at: new Date(),
				updated_at: new Date(),
			};
		});
		await queryInterface.bulkInsert("movies", movies, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('Movies', null, {});
		 */
	},
};
