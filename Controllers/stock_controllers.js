const { postDBData, dateString } = require('../utils');
const { Stock, StockMath } = require('./MainLogic');
const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @param {Request} req request from the client
 * @param {Response} res response from the server
 * @description Gets to home page
 * @route /
 * @method GET
 */ 
function getToHome(req, res) {
    try {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/init.html')));
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/error.html')));
    }
}

/**
 * @param {Request} req request from the client
 * @param {Response} res response from the server
 * @param {Array} storage Array of stock objects
 * @description Post form data to route /submit
 * @route /submit
 * @method POST
 */ 
async function form(req, res, storage) {
    try {
        let data = await postDBData(req);
        let params = data.split('&').map(ele => ele.split('=')[1]).map(date => dateString(date));
        let stocks = new Stock(await storage);
        let filtered_Array = Stock.sort_obj(stocks.data).filter(item => item.stock_name.toUpperCase() == params[2]);
        let stockObj = filtered_Array.map(function(item) {
            return [item.date, item.price];
        });
        let [start, end] = stocks.findRange(stockObj.map(item => item[0]), [params[0], params[1]]);
        let maths = new StockMath(stockObj.map(item => item[0]).slice(start, end + 1), stockObj.map(item => item[1]).slice(start, end + 1))
        let buy_sell = stocks.buySellStock(stockObj.map(item => item[1]).slice(start, end + 1));
        buy_sell.range = stockObj.slice(start, end + 1);
        buy_sell.SD = maths.standardDeviation;
        buy_sell.mean = maths.mean
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/results.html')));
        return { buy_sell, user: [params[0], params[1], params[2]] };
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/error.html')));
    }
}

/**
 * @param {Request} req request from the client
 * @param {Response} res response from the server
 * @description Post Data to DB (Server Storage)
 * @route /post
 * @method POST
 */ 
 async function writeToDB(req, res) {
    try {
        const body = await postDBData(req);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/output.html')));
        return JSON.parse(body);
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(__dirname, '../Views/error.html')));
    }
}

/**
 * @param {Request} req request from the client
 * @param {Response} res response from the server
 * @param {Array} data Array of buy and sell stocks
 * @description Gets Stocks from serverStorage
 * @route /submit
 * @method GET
 */ 
async function readDatafromForm(req, res, data) {
    try {
        let return_object = data;
        if(!return_object) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No Stock found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(return_object));
        }
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error }));
    }
}

/**
 * @param {Request} req request from the client
 * @param {Response} res response from the server
 * @param {Array} data Array of stock objects
 * @description Gets Stocks from serverStorage
 * @route /get
 * @method GET
 */ 
async function readDatafromDB(req, res, data) {
    try {
        let return_object = await data;
        if(!return_object) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No Stock found' }));
        } else {
            let stock_names = [...new Set(return_object.map(ele => ele.stock_name.toUpperCase()))];
            let sortedObj = Stock.sort_obj(return_object);
            let [start, end] = [dateString(sortedObj[0].date), dateString(sortedObj[sortedObj.length - 1].date)];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({stock:stock_names, start, end}));
        }
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error }));
    }
}

module.exports = {
    writeToDB,
    readDatafromDB,
    getToHome,
    form,
    readDatafromForm
}