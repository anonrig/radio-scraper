"use strict";

const Sequelize = require('sequelize');
const debug = require('debug')('re:lib:db');

const config = require('../config');

module.exports = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'postgres',
        logging: debug
    }
);
