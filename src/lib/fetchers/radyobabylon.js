"use strict";

const cheerio = require('cheerio');
const exec = require('child_process').exec;
const debug = require('debug')('re:lib:fetchers:radyobabylon');


/**
 * Fetcher class for radyo babylon.
 */
class RadyoBabylonFetcher {
    /**
     * Runs `curl http://babylon.com.tr/tr/`, reads `.radio-song-artist` and
     * `.radio-song-title` elements and finally gets currently playing song
     * and its artist.
     *
     * @param {function(boolean, {artist, title})} callback Error object is
     * the first parameter and the data is second.
     */
    static fetch(callback) {
        exec(' curl http://babylon.com.tr/tr/', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl babylon.com.tr', err);
                return callback(err);
            }

            let $ = cheerio.load(stdout);
            let artist = $('.track-name .marquee-content').text() || '';
            let title = $('.artist-name .marquee-content').text() || '';

            if (!artist || !title) {
                debug('Not fount artist or title', $('#mrp-radyo-babylon').text());
                return callback('Not fount artist or title');
            }

            callback(null, { artist, title });
        });
    }
}


module.exports = RadyoBabylonFetcher;
