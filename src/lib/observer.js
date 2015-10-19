var Fetcher = require('./fetcher'),
    debug = require('debug')('re:lib:observer');


/**
 * Observer class. Will fetch playing song for every interval, then checks
 * it with previous record. Callback will be called when song is changed.
 * @param {number} checkInterval In milliseconds.
 * @param {function(Object)} callback
 */
var Observer = function(checkInterval, callback) {
    this.current_ = null;
    this.checkInterval_ = checkInterval;
    this.interval_ = null;
    this.callback_ = callback;
};


/**
 * Starts watching.
 */
Observer.prototype.start = function() {
    this.interval_ = setInterval(this.check_.bind(this), this.checkInterval_);
    this.check_();
};


/**
 * Our atomic checker method.
 */
Observer.prototype.check_ = function() {
    var that = this,
        previous = this.current_;

    Fetcher.fetch(function(err, song) {
        if (err)
            return debug('Cannot fetch, moving on...', err);

        that.current_ = song.artist + song.title;

        if (that.current_ != previous)
            that.callback_(song);
    });
};


module.exports = Observer;
