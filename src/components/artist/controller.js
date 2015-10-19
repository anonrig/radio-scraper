"use strict";

const Artist = require('./model');


/**
 * Artist controller.
 */
class ArtistController {
    /**
     * Upserts given artist.
     * @param {Object} artist
     * @return {Promise}
     */
    static upsert(artist) {
        let name = artist.name;

        return Artist
                .findOne({
                    where: { name }
                })
                .then(artist => {
                    if (artist)
                        return artist;

                    return Artist.create({ name });
                });
    }
}


module.exports = ArtistController;
