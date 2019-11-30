
module.exports = (sequelize, Sequelize, Movies, Genres) => {
    return sequelize.define('moviesGenres', {
        movieId: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Movies, key: Movies.id}},
        genresId: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Genres, key: Genres.id}}
    })
}