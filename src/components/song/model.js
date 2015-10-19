"use strict";

const Sequelize = require('sequelize');
const db = require('../../lib/db');

const Artist = require('../artist/model');


/**
 * Song model.
 */
let Song = db.define('Song', {
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


/**
 * Define relations.
 */
Song.belongsTo(Artist, { as: 'Artist', foreignKey: 'artist' });
Artist.hasMany(Song, { as: 'Songs', foreignKey: 'artist' });


module.exports = Song;
