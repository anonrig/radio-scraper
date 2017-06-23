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
        exec(' curl http://api.pozitifmuzik.com/channel/main/nowplaying/', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl api.pozitifmuzik.com', err);
                return callback(err);
            }

            try {
                const result = JSON.parse(stdout);
                const artist = result.data.current && result.data.current.artist && result.data.current.artist.name;
                const title = result.data.current && result.data.current.track && result.data.current.track.name;

                if (!artist || !title) {
                    return callback('Not fount artist or title');
                }

                callback(null, { artist, title });
            } catch (err) {
                callback('Could not parse json or worse:' + err);
            }
        });
    }
}


module.exports = RadyoBabylonFetcher;
