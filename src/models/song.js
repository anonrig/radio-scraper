var Sequelize = require('sequelize'),
    db = require('../lib/db');

var Artist = require('./artist');


/**
 * Song model.
 */
var Song = db.define('Song', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    artist: {
        type: Sequelize.STRING,
        references: {
            model: Artist,
            key: 'name',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        unique: 'artistTitle'
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'artistTitle'
    }
}, {});


module.exports = Song;
