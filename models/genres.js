
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('genres', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        genres: {type: Sequelize.STRING}
    })
}
