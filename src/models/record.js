var Sequelize = require('sequelize'),
    db = require('../lib/db');

var Song = require('./song');


/**
 * Record model
 */
var Record = db.define('Record', {
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
