
module.exports = (sequelize, Sequelize) => {
    return sequelize.define({ //"Title", "Directors", "Release Date", "Rating", "Run Time", "Genres"
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: Sequelize.STRING},
        director: {type: Sequelize.STRING},
        release: {type: Sequelize.STRING},
        rating: {type: Sequelize.STRING},
        runTime: {type: Sequelize.STRING},
        genere: {type: Sequelize.STRING}
    })
}