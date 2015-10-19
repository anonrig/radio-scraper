"use strict";

const _ = require('lodash');
const debug = require('debug')('re:app');

const db = require('./lib/db');
const Observer = require('./lib/observer');
const ArtistController = require('./components/artist/controller');
const SongController = require('./components/song/controller');
const RecordController = require('./components/record/controller');


/**
 * Starts the application
 */
function boot() {
    debug('Booting...');

    db
        .sync()
        .then(() => {
            debug('Connected to db');

            let observer = new Observer(60000, onSongChanged);
            observer.start();
        })
        .catch((err) => {
            console.log('Could not boot!');
            console.log(err.stack);
            process.exit();
        });
};


/**
 * On song changed handler
 * @param {{artist: string, title: string}} data
 */
function onSongChanged(data) {
    let artist;
    let song;

    ArtistController
        .upsert({ name: data.artist })
        .then(artist_ => {
            artist = artist_;

            return SongController.upsert({
                artist: artist_.name,
                title: data.title
            });
        })
        .then(song_ => {
            song = song_;
            return RecordController.getLatest();
        })
        .then(record => {
            if (record && record.songId == song.id)
                return;

            return RecordController.create({
                songId: song.id,
                date: new Date()
            });
        })
        .then(function() {
            debug('Record added', data);
        })
        .catch(err => {
            console.log('Cannot add a record', data, err);
            console.log(err.stack);
        });
};


boot();
