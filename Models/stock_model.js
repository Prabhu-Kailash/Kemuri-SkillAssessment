const { writeDataToFile } = require('../utils');

function write(stock) {
    writeDataToFile('stock.json', stock);
    return stock;
}


module.exports = {
    write
}