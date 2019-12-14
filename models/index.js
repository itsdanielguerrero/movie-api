const Sequelize = require('sequelize')
const AllConfigs = require('../config/sequelize')
const MovieModel = require('./movies')
const DirectorsModel = require('./directors')
const GenresModel = require('./genres')
const MoviesDirectorsModel = require('./moviesDirectors')
const MoviesGenresModel = require('./moviesGenres')

const config = AllConfigs['development']

const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    define: {
        timestamps: false
    }
})

const Movies = MovieModel(connection, Sequelize)
const Directors = DirectorsModel(connection, Sequelize)
const Genres = GenresModel(connection, Sequelize)
const MoviesDirectors = MoviesDirectorsModel(connection, Sequelize, Movies, Directors)
const MoviesGenres = MoviesGenresModel(connection, Sequelize, Movies, Genres)
const Op = Sequelize.Op


Movies.belongsToMany(Directors, {through: MoviesDirectors})
Directors.belongsToMany(Movies, {through: MoviesDirectors})
Movies.belongsToMany(Genres, {through: MoviesGenres})
Genres.belongsToMany(Movies, {through: MoviesGenres})

module.exports = {
    Movies,
    Directors,
    Genres,
    MoviesDirectors,
    MoviesGenres,
    Op
}