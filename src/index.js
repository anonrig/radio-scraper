"use strict";

const _ = require('lodash');
const debug = require('debug')('re:app');

const db = require('./lib/db');
const Observer = require('./lib/observer');


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
    console.log(data, new Date());
};


boot();
