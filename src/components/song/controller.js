"use strict";

const Song = require('./model');


/**
 * Song controller.
 */
class SongController {
    /**
     * Upserts given song.
     * @param {Object} song
     * @return {Promise}
     */
    static upsert(song) {
        let title = song.title;
        let artist = song.artist;

        return Song
                .findOne({
                    where: { artist, title }
                })
                .then(song => {
                    if (song)
                        return song;

                    return Song.create({ artist, title });
                });
    }
}


module.exports = SongController;
