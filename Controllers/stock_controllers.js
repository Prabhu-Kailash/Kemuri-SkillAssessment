const { postDBData } = require('../utils');
const { write } = require('../Models/stock_model');
const { readFileSync } = require('fs');
const { join } = require('path');

// @desc    Gets to home page
// @route   GET /
function getToHome(req, res) {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/init.html')));
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/error.html')));
    }
}

// @desc    Gets Stocks from DB
// @route   GET /get
async function readDatafromDB(req, res, data) {
    try {
        let return_object = await data;
        let stock_names = [...new Set(return_object.map(ele => ele.stock_name.toUpperCase()))];
        if(!return_object) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No Stock found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(stock_names));
        }
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error }));
    }
}


// @desc    Write Data to DB (Server Storage)
// @route   POST /post
async function writeToDB(req, res) {
    try {
        const body = await postDBData(req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success : 'Write success' }));
        return JSON.parse(body);
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error : 'Unable to write to DB' }));
    }
}

module.exports = {
    writeToDB,
    readDatafromDB,
    getToHome
}