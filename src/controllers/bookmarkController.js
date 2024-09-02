const { Movies, Users } = require("../../db/models");
var jwt = require("jsonwebtoken");

module.exports = {
	createBookmark: async (req, res) => {
		const { movieId } = req.params;
		const { accesstoken } = req.headers;
		const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
		const { id } = decoded.user;
		try {
			const findMovie = await Movies.findByPk(movieId);
			if (!findMovie) {
				return res
					.status(404)
					.json({ error: "Not found", message: "Movie not found" });
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
				return res
					.status(404)
					.json({ error: "Not found", message: "User not found" });
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
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	},
	getMyBookmark: async (req, res) => {
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
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	},
};
