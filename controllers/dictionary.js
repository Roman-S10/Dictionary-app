const fs = require('fs');
const path = require('path');
const os = require('os');
const lineReader = require('line-reader');

const _getDictionaryFilePath = () => {
    const root = path.dirname(require.main.filename || process.require.main.filename);
    return path.join(root, 'dictionary.txt');
}

const _prepearString = (str) => {
    return str.trim().toLowerCase();
}

exports.createWordsPair = (req, res) => {
    const {word, translation} = req.body;
    const pair = `${_prepearString(word)}=${_prepearString(translation)}${os.EOL}`;

    fs.appendFile(_getDictionaryFilePath(), pair, err => {
        if(err) throw err;
        res.send({info: `New words pair [ ${pair} ] added to the file.`});
    })
};

exports.getTranslation = (req, res) => {
    
    lineReader.eachLine(_getDictionaryFilePath(), (line, last) => {
        const word = _prepearString(req.params.word);

        if(line.includes(word)) {
            const index = line.indexOf('=');
            const translation = line.substr(index + 1);
            res.send({translation: translation});
            return false;
        }else if(last){
            res.send({error: `Sorry, there is no any translation for [ ${word} ].`});
            return false;
        }
    });
};