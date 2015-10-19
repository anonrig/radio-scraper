"use strict";

const Sequelize = require('sequelize');
const debug = require('debug')('re:lib:db');

module.exports = new Sequelize('radioeksen', 'dgurkaynak', null, {
    host: 'localhost',
    dialect: 'postgres',
    logging: debug
});
