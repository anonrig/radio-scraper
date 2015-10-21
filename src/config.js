if (!process.env.NODE_ENV)
    throw new Error('Please provide NODE_ENV.');

var jsonPath = '../config/' + process.env.NODE_ENV + '.json',
    content;

try {
    content = require(jsonPath);
} catch(e) {
    throw new Error('Not found config file: ' + jsonPath);
}

module.exports = content;
