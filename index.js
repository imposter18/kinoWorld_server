require("dotenv").config();
const express = require("express");
const Sequelize = require("./db");
const models = require("./models/models.js");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
// обработка ошибок
app.use(errorHandler);

const start = async () => {
	try {
		await Sequelize.authenticate();
		await Sequelize.sync();
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};
start();
