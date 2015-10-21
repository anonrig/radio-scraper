radio-scraper
---

I love listening radios. I always chat with friends about trending songs, always-repeating songs etc. This simple node app watches and records currently playing song for every 1 minute. This app just records to PostgreSQL. When enough data is collected, I will make an analyzer tool.

Currently supported radios:
- [Radio Eksen](http://radioeksen.com)
- [Radyo Babylon](http://radyobabylon.com)
- [Max FM](http://maxfm.com.tr)

Setup
---
1. Clone this repo.
    ```
    git clone git@github.com:dgurkaynak/radio-scraper.git
    ```
2. Install dependencies with `npm i`.
3. Create 3 empty db with following names:
    - radioeksen
    - radyobabylon
    - maxfm
4. Edit your all the config files in `./config/` folder for database configuration.
5. Run you app with one of supported radio.
    ```
    NODE_ENV=[radioeksen|radyobabylon|maxfm] npm start
    ```

> Note that, one app process tracks just one radio. If you want to scrap all 3 radios, you need to go with 3 different processes.

> This app is written with ES6 (or ES2015) and developed & tested in node `4.2.x`.

Adding new radios
---
1. Create a database for `newradio`.
2. Add a config file to `./config/newradio.json`.
3. Create a fetcher to `./src/lib/fetchers/newradio.js`. You should define a `NewRadioFetcher` class with static `fetch()` method. In this method you should fetch online radio's website and extract artist and song information. Please look at existing fetcher classes.
4. Open `./src/lib/observer.js` and require new fetcher class you just wrote.
    ```
    const NewRadioFetcher = require('./fetchers/newradio');
    ```
5. Edit switch statement in the `constructor` method. Add new case:
    ```
    case 'newradio':
        this.fetcher = NewRadioFetcher;
        break;
    ```
6. Test your app!
    ```
    NODE_ENV=newradio npm start
    ```
