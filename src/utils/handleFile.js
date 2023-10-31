const fs = require('fs')

const readFileAndConvertJsonToArray = (path) => {
    let jsonDatabase = fs.readFileSync(path)
    let arrayDatabase = JSON.parse(jsonDatabase)
    return arrayDatabase
}

const writeFile = (path, text) => {
    fs.writeFileSync(path, text)
}

module.exports = {
    readFileAndConvertJsonToArray, 
    writeFile
}