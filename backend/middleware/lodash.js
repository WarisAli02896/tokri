const lodash = require('lodash');

exports.mapOutput = (input, template) => {
    return lodash.map(input, (item) => {
        const output = {};
        lodash.forIn(template, (path, key) => {
            lodash.set(output, key, lodash.get(item, path));
        });
        return output;
    });
}