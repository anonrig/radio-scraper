"use strict";

const cheerio = require('cheerio');
const exec = require('child_process').exec;
const debug = require('debug')('re:lib:fetchers:maxfm');


/**
 * Fetcher class for maxfm.
 */
class MaxFMFetcher {
    /**
     * Fetches max fm.
     *
     * @param {function(boolean, {artist, title})} callback Error object is
     * the first parameter and the data is second.
     */
    static fetch(callback) {
        exec(' curl http://www.maxfm.com.tr/liveplayer', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl maxfm.com.tr/liveplayer', err);
                return callback(err);
            }

            let $ = cheerio.load(stdout);
            let artist = $('.pastMusicAlbum').text() || '';
            let title = $('.pastMusicTitle').text() || '';

            if (!artist || !title) {
                debug('Not fount artist or title', $('.pastMusicListMusicInfo').text());
                return callback('Not fount artist or title');
            }

            callback(null, { artist, title });
        });
    }
}


module.exports = MaxFMFetcher;
