const { writeFileSync } = require('fs');

function convertToJson(data) {
    return JSON.stringify(data);
}

function dateString(date) {
    dArr = date.split("-");
    return (dArr.length > 1) ? (dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]) : dArr[0];
}

function writeDataToFile(filename, content) {
    writeFileSync(filename, convertToJson(content), 'utf8', (err) => {
        if(err) {
            console.log(err);
        }
    });
}

function postDBData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = new String;
            req.on('data', (blob) => {
                body += blob.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(err);
        }
    });
}

module.exports = {
    writeDataToFile,
    postDBData,
    dateString
}