const { Movies } = require("../../db/models");
const NotFoundError = require("../errors/NotFoundError");

module.exports = {
	movieList: async (req, res, next) => {
		const { limit, page } = req.query;
		try {
			const movies = await Movies.findAndCountAll({
				offset: !page || !limit ? null : 0 + (page - 1) * limit,
				limit: !limit ? null : limit,
			});
			return res.send({ movies, page, limit });
		} catch (error) {
			next(error);
		}
	},
	movieDetail: async (req, res, next) => {
		const { id } = req.params;
		try {
			const movie = await Movies.findByPk(Number(id));
			if (!movie) {
				throw new NotFoundError("Data not found.");
			}
			return res.send(movie);
		} catch (error) {
			next(error);
		}
	},
};
