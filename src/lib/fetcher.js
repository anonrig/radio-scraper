"use strict";

const cheerio = require('cheerio');
const exec = require('child_process').exec;
const debug = require('debug')('re:lib:fetcher');


/**
 * The Fetcher.
 */
class Fetcher {
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
        exec('curl http://live.radioeksen.com/', (err, stdout, stderr) => {
            if (err) {
                debug('Cannot curl live.radioeksen.com', err);
                return callback(err);
            }

            let $ = cheerio.load(stdout);
            let playingSongText = $('#playingSong').text() || '';
            let playingSongLines = playingSongText.split('\n');

            if (!playingSongLines[4]) {
                debug('Not supported #playingSong.text()', playingSongText);
                return callback('Not found the song text');
            }

            let playingSong = playingSongLines[4];
            let playingSongArr = playingSong.split('-');

            if (playingSongArr.length == 1) {
                debug('Unrecognized song format', playingSongLines);
                return callback('Wrong song format');
            }

            let artist = playingSongArr[0].trim();
            let title = playingSongArr[1].trim();

            callback(null, { artist, title });
        });
    }
}


module.exports = Fetcher;
