const { Movies, Users } = require("../../db/models");
var jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/NotFoundError");

module.exports = {
	createBookmark: async (req, res, next) => {
		const { movieId } = req.params;
		const { accesstoken } = req.headers;
		const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
		const { id } = decoded.user;
		try {
			const findMovie = await Movies.findByPk(movieId);
			if (!findMovie) {
				throw new NotFoundError("Movie not found");
			}
			const findUser = await Users.findByPk(id, {
				include: [
					{
						model: Movies,
						as: "movies",
					},
				],
			});
			if (!findUser) {
				throw new NotFoundError("User not found");
			}

			await findUser.addMovies(findMovie);
			const parsed = {
				massage: "Success adding new bookmark",
				userId: id,
				movieId: movieId,
				movieTitle: findMovie.dataValues.title,
			};
			return res.status(201).json(parsed);
		} catch (error) {
			next(error);
		}
	},
	getMyBookmark: async (req, res, next) => {
		const { accesstoken } = req.headers;
		const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
		const { id } = decoded.user;
		try {
			const { dataValues } = await Users.findByPk(id, {
				include: [
					{
						model: Movies,
						as: "movies",
					},
				],
			});
			const parsed = {
				id: dataValues.id,
				name: dataValues.name,
				username: dataValues.username,
				email: dataValues.email,
				createdAt: dataValues.createdAt,
				updatedAt: dataValues.updatedAt,
				movies: dataValues.movies,
			};
			res.send(parsed);
		} catch (error) {
			next(error);
		}
	},
};
