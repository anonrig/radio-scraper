"use strict";

const Record = require('./model');
const Song = require('../song/model');


/**
 * Record controller.
 */
class RecordController {
    /**
     * Creates a record.
     * @param {Object} data
     * @return {Promise}
     */
    static create(data) {
        return Record.create(data);
    }


    /**
     * Gets latest added record.
     * @return {Promise}
     */
    static getLatest() {
        return Record
                .findOne({
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: 1,
                    include: [
                        { model: Song, as: 'Song' }
                    ]
                });
    }
}


module.exports = RecordController;
