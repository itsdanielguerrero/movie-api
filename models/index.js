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
    dialect: config.dialect
})

const Movies = MovieModel(connection, Sequelize)
const Directors = DirectorsModel(connection, Sequelize)
const Genres = GenresModel(connection, Sequelize)
const MoviesDirectors = MoviesDirectorsModel(connection, Sequelize, Movies, Directors)
const MoviesGenres = MoviesGenresModel(connection, Sequelize, Movies, Genres)
const Op = Sequelize.Op

MoviesDirectors.belongsTo(Movies)
Movies.hasMany(MoviesDirectors)
MoviesDirectors.belongsTo(Directors)
Directors.hasMany(MoviesDirectors)

MoviesGenres.belongsTo(Movies)
Movies.hasMany(MoviesGenres)
MoviesGenres.belongsTo(Genres)
Movies.hasMany(MoviesGenres)

module.exports = {
    Movies,
    Directors,
    Genres,
    MoviesDirectors,
    MoviesGenres,
    Op
}