var _ = require('lodash'),
    debug = require('debug')('re:app');

var db = require('./lib/db'),
    Observer = require('./lib/observer'),
    models = require('./models');


/**
 * Starts the application
 */
function boot() {
    debug('Booting...');

    db
        .sync()
        .then(function() {
            debug('Connected to db');

            var observer = new Observer(60000, onSongChanged);
            observer.start();
        })
        .catch(function(err) {
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
