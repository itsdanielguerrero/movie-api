const Sequelize = require('sequelize')
const AllConfigs = require('../config/sequelize')

const config = AllConfigs['development']

const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
})