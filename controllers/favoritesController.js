const { Favorites, FavoritesFilms } = require("../models/models");
const ApiError = require("../error/ApiError");

class favoritesController {
	async create(req, res) {
		const { userId, filmId } = req.body;
		const { id: favoriteId } = await Favorites.findOne({ where: { userId } });
		const checkFavoritesFilms = await FavoritesFilms.findOne({
			where: { favoriteId, filmId },
		});
		console.log("123123", checkFavoritesFilms);
		if (checkFavoritesFilms) {
			return res
				.status(403)
				.json({ message: "Такой фильм уже существует в вашей коллекции" });
		}
		const favoritesFilms = await FavoritesFilms.create({ favoriteId, filmId });
		return res.json(favoritesFilms);
	}
	async getAll(req, res) {
		const { id } = req.headers;
		const favorites = await Favorites.findOne({ where: { userId: id } });
		const favoritesFilms = await FavoritesFilms.findAndCountAll({
			where: { favoriteId: favorites.id },
		});
		return res.json(favoritesFilms);
	}
	async deleteOne(req, res) {
		const { userId, filmId } = req.body;
		const { id: favoriteId } = await Favorites.findOne({ where: { userId } });
		const favoritesFilms = await FavoritesFilms.destroy({
			where: { favoriteId, filmId },
		});
		return res.json(favoritesFilms);
	}
}
module.exports = new favoritesController();
