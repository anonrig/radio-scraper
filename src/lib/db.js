"use strict";

const Sequelize = require('sequelize');

module.exports = new Sequelize('radioeksen', 'dgurkaynak', null, {
    host: 'localhost',
    dialect: 'postgres'
});
