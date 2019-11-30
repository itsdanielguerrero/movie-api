
module.exports = (sequelize, Sequelize, Movies, Directors) => {
    return sequelize.define('moviesDirectors', {
        movieId: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Movies, key: Movies.id}},
        directorId: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Directors, key: Directors.id}}
    })
}
