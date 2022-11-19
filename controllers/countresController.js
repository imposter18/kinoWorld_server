const { Countres } = require("../models/models");
const ApiError = require("../error/ApiError");

class CountresController {
	async create(req, res) {
		const { value } = req.body;
		const country = await Countres.create({ value });
		return res.json(country);
	}
	async getAll(req, res) {
		const country = await Countres.findAll();
		return res.json(country);
	}
}
module.exports = new CountresController();
