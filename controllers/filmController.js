const ApiError = require("../error/ApiError");
const { Film } = require("../models/models");

class FilmController {
	async create(req, res, next) {
		try {
			const {
				title,
				titleAlt,
				poster,
				directors,
				premiereWorld,
				genreId,
				countreId,
			} = req.body;
			// console.log("net", req.body);
			const film = await Film.create({
				title,
				titleAlt,
				poster,
				directors,
				premiereWorld,
				genreId,
				countreId,
			});
			return res.json(film);
		} catch (e) {
			next(ApiError.badRequest(e.massage));
		}
	}
	async getAll(req, res) {
		let { genreId, countreId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		let films;
		if (!genreId && !countreId) {
			films = await Film.findAndCountAll({ limit, offset });
		}
		if (genreId && !countreId) {
			films = await Film.findAndCountAll({ where: { genreId }, limit, offset });
		}
		if (!genreId && countreId) {
			films = await Film.findAndCountAll({
				where: { countreId },
				limit,
				offset,
			});
		}
		if (genreId && countreId) {
			films = await Film.findAndCountAll({
				where: { countreId, genreId },
				limit,
				offset,
			});
		}
		return res.json(films);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const film = await Film.findOne({
			where: { id },
		});
		return res.json(film);
	}
}
module.exports = new FilmController();
