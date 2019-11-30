
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('movies', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: Sequelize.STRING},
        releaseDate: {type: Sequelize.STRING},
        rating: {type: Sequelize.STRING},
        runTime: {type: Sequelize.STRING}
    })
}
