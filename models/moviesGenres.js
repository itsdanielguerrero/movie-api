
module.exports = (sequelize, Sequelize, Movies, Genres) => {
    return sequelize.define('moviesGenres', {
        movieId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Movies, key: Movies.id } },
        genreId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Genres, key: Genres.id } }
    })
}