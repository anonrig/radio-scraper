var cheerio = require('cheerio'),
    exec = require('child_process').exec,
    debug = require('debug')('re:lib:fetcher');


/**
 * The Fetcher.
 */
var Fetcher = function() {};


/**
 * Runs `curl http://live.radioeksen.com/`, reads #playingSong element
 * and finally gets currently playing song and its artist. Don't ask me why
 * curl, beacause neither request and bare http modules is not working for
 * live.radioeksen.com.
 *
 * @param {function(boolean, {artist, title})} callback Error object is
 * the first parameter and the data is second.
 */
Fetcher.fetch = function(callback) {
    exec('curl http://live.radioeksen.com/', function(err, stdout, stderr) {
        if (err) {
            debug('Cannot curl live.radioeksen.com', err);
            return callback(err);
        }

        var $ = cheerio.load(stdout),
            playingSongText = $('#playingSong').text() || '',
            playingSongLines = playingSongText.split('\n');

        if (!playingSongLines[4]) {
            debug('Not supported #playingSong.text()', playingSongText);
            return callback('Not found the song text');
        }

        var playingSong = playingSongLines[4],
            playingSongArr = playingSong.split('-');

        if (playingSongArr.length == 1) {
            debug('Unrecognized song format', playingSongLines);
            return callback('Wrong song format');
        }

        var artist = playingSongArr[0].trim(),
            title = playingSongArr[1].trim();

        callback(null, {
            artist: artist,
            title: title
        });
    });
};


module.exports = Fetcher;
