const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Favorites = sequelize.define("favorites", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const FavoritesFilms = sequelize.define("favoritesFilms", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Film = sequelize.define("film", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	titleAlt: { type: DataTypes.STRING },
	poster: { type: DataTypes.STRING, allowNull: false },
	// directors: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
	directors: { type: DataTypes.STRING, allowNull: false },
	// genreId: { type: DataTypes.INTEGER, allowNull: false },
	// countresId: { type: DataTypes.INTEGER, allowNull: false },
	// yearId: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.INTEGER, defaultValue: 0 },
	premiereWorld: { type: DataTypes.STRING },
});

const Genre = sequelize.define("genre", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	value: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Countres = sequelize.define("countres", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	value: { type: DataTypes.STRING, unique: true, allowNull: false },
});
// const Year = sequelize.define("year", {
// 	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// 	value: { type: DataTypes.STRING, unique: true, allowNull: false },
// });
const Rating = sequelize.define("rating", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.STRING, allowNull: false },
});
const Review = sequelize.define("review", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	reviews: { type: DataTypes.STRING, allowNull: false },
	title: { type: DataTypes.STRING, allowNull: false },
	reviewLikes: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
	reviewDislikes: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	rating: { type: DataTypes.INTEGER, allowNull: false },
	type: { type: DataTypes.STRING, allowNull: false },
});

const TypeGenre = sequelize.define("type-genre", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Favorites);
Favorites.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Favorites.hasMany(FavoritesFilms);
FavoritesFilms.belongsTo(Favorites);

Genre.hasMany(Film);
Film.belongsTo(Genre);

Countres.hasMany(Film);
Film.belongsTo(Countres);

Film.hasMany(Review);
Review.belongsTo(Film);

Film.hasOne(FavoritesFilms);
FavoritesFilms.belongsTo(Film);

Film.hasMany(Review);
Review.belongsTo(Film);
//
Film.hasMany(Rating);
Rating.belongsTo(Film);

Genre.belongsToMany(Countres, { through: TypeGenre });
Countres.belongsToMany(Genre, { through: TypeGenre });

module.exports = {
	User,
	Favorites,
	Film,
	Genre,
	FavoritesFilms,
	Rating,
	Review,
	TypeGenre,
	Countres,
};
