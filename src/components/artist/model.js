"use strict";

const Sequelize = require('sequelize');
const db = require('../../lib/db');


/**
 * Artist model
 */
let Artist = db.define('Artist', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
}, {});


module.exports = Artist;
