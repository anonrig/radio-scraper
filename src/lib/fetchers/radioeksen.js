"use strict";

const cheerio = require('cheerio');
const exec = require('child_process').exec;
const debug = require('debug')('re:lib:fetchers:radioeksen');


/**
 * The Fetcher.
 */
class RadioEksenFetcher {
    /**
     * Runs `curl http://live.radioeksen.com/`, reads #playingSong element
     * and finally gets currently playing song and its artist. Don't ask me why
     * curl, beacause neither request and bare http modules is not working for
     * live.radioeksen.com.
     *
     * @param {function(boolean, {artist, title})} callback Error object is
     * the first parameter and the data is second.
     */
    static fetch(callback) {
        exec('curl http://radioeksen.com/Json/GetCurrentSong', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl http://radioeksen.com/Json/GetCurrentSong', err);
                return callback(err);
            }

            const rawResult = typeof stdout == 'string' ? stdout.trim() : null;

            if (!rawResult)
                return callback('Empty result');

            try {
                const result = JSON.parse(rawResult);

                if (!result.Artist || !result.TrackName)
                    return callback('Empty artist or track');

                callback(null, {
                    artist: result.Artist,
                    title: result.TrackName
                });
            } catch (err) {
                console.log('Could not parse json', rawResult);
                callback('Could not parse json');
            }
        });
    }
}


module.exports = RadioEksenFetcher;
