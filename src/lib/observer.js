"use strict";

const Fetcher = require('./fetcher');
const debug = require('debug')('re:lib:observer');


/**
 * Observer class. Will fetch playing song for every interval, then checks
 * it with previous record. Callback will be called when song is changed.
 * @param {number} checkInterval In milliseconds.
 * @param {function(Object)} callback
 */
class Observer {
    constructor(checkInterval, callback) {
        this.current_ = null;
        this.checkInterval_ = checkInterval;
        this.interval_ = null;
        this.callback_ = callback;
    }


    /**
     * Starts watching.
     */
    start() {
        this.interval_ = setInterval(this.check_.bind(this), this.checkInterval_);
        this.check_();
    }


    /**
     * Our atomic checker method.
     */
    check_() {
        let previous = this.current_;

        Fetcher.fetch((err, song) => {
            if (err)
                return debug('Cannot fetch, moving on...', err);

            this.current_ = song.artist + song.title;

            if (this.current_ != previous)
                this.callback_(song);
        });
    }
}


module.exports = Observer;
