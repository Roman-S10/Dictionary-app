const fs = require('fs');
const path = require('path');
const os = require('os');
const lineReader = require('line-reader');

const __getDictionaryFilePath = () => {
    const root = path.dirname(require.main.filename || process.require.main.filename);
    return path.join(root, 'dictionary.txt');
}

exports.createWordsPair = (req, res) => {
    const {word, translation} = req.body;
    const pair = `${word.toLowerCase()}=${translation.toLowerCase()}${os.EOL}`;
    
    fs.appendFile(__getDictionaryFilePath(), pair, err => {
        if(err) throw err;
        res.send(`New words pair [${pair}] added to the file.`);
    })
};

exports.getTranslation = (req, res) => {
    
    lineReader.eachLine(__getDictionaryFilePath(), line => {
        const word = req.params.word.toLowerCase();

        if(line.includes(word)) {
            const index = line.indexOf('=');
            const translation = line.substr(index + 1);
            res.send({"translation": translation});
            return false;
        }else{
            res.send(`Sorry, there is no any translation for [${word}].`);
            return false;
        }
    });
};