var Sequelize = require('sequelize'),
    db = require('../lib/db');


/**
 * Artist model
 */
var Artist = db.define('Artist', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
}, {});


module.exports = Artist;
