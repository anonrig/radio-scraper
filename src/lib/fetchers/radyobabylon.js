"use strict";

const cheerio = require('cheerio');
const exec = require('child_process').exec;
const debug = require('debug')('re:lib:fetchers:radyobabylon');


/**
 * Fetcher class for radyo babylon.
 */
class RadyoBabylonFetcher {
    /**
     * Runs `curl http://pozitiflive.com/tr`, reads `.radio-song-artist` and
     * `.radio-song-title` elements and finally gets currently playing song
     * and its artist.
     *
     * @param {function(boolean, {artist, title})} callback Error object is
     * the first parameter and the data is second.
     */
    static fetch(callback) {
        exec(' curl http://pozitiflive.com/tr', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl pozitiflive.com', err);
                return callback(err);
            }

            let $ = cheerio.load(stdout);
            let artist = $('.radio-song-artist div').text() || '';
            let title = $('.radio-song-title div').text() || '';

            if (!artist || !title) {
                debug('Not fount artist or title', $('.radio-player').text());
                return callback('Not fount artist or title');
            }

            callback(null, { artist, title });
        });
    }
}


module.exports = RadyoBabylonFetcher;
