"use strict";

const Sequelize = require('sequelize');
const db = require('../../lib/db');

const Song = require('../song/model');


/**
 * Record model
 */
let Record = db.define('Record', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    songId: {
        type: Sequelize.INTEGER,
        references: {
            model: Song,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {});


module.exports = Record;
