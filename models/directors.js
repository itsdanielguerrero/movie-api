
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('directors', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        director: {type: Sequelize.STRING}
    })
}
