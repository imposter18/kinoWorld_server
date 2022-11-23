const { Rating, Film } = require("../models/models");
const ApiError = require("../error/ApiError");

const updateRatind = (item) => {
	const { count, rows } = item;
	const rate = rows.reduce((sum, current) => {
		return sum + Number(current.rate);
	}, 0);
	// const a = (rate / count).toFixed(2);

	return Math.round(rate / count);
};

class ratingController {
	async update(req, res) {
		const { rate, filmId, userId } = req.body;
		const checkHasRating = await Rating.findOne({ where: { filmId, userId } });
		if (checkHasRating) {
			const upRatind = await Rating.update(
				{
					rate,
				},
				{
					where: {
						filmId,
						userId,
					},
				}
			);
			const countRaritg = await Rating.findAndCountAll({
				raw: true,
				where: { filmId },
			});
			const newRarind = updateRatind(countRaritg);
			await Film.update(
				{
					rating: newRarind,
				},
				{
					where: { id: filmId },
				}
			);
			return res.json(upRatind);
		} else {
			const rating = await Rating.create({ rate, filmId, userId });
			const countRaritg = await Rating.findAndCountAll({
				raw: true,
				where: { filmId },
			});
			const newRarind = updateRatind(countRaritg);
			await Film.update(
				{
					rating: newRarind,
				},
				{
					where: { id: filmId },
				}
			);
			return res.json(rating);
		}
	}
	async getAll(req, res) {
		const { filmId } = req.body;
		const favorites = await Rating.findAndCountAll({
			raw: true,
			where: { filmId },
		});
		return res.json({ count: updateRatind(favorites) });
	}
}
module.exports = new ratingController();
