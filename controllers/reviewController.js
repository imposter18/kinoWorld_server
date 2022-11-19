const { Review } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
	async create(req, res) {
		const { title, reviews, rating, type, filmId } = req.body;
		console.log(title);
		const review = await Review.create({
			title,
			reviews,
			rating,
			type,
			filmId,
		});
		return res.json(review);
	}
	async getAll(req, res) {
		const { filmId } = req.query;
		const review = await Review.findAndCountAll({ where: { filmId } });
		return res.json(review);
	}
}
module.exports = new ReviewController();
