// Node In-build 
const { createServer } = require('http');
const { readFileSync } = require('fs');
const { join } = require('path');
const { writeToDB, readDatafromDB, getToHome } = require('./Controllers/stock_controllers');
const { postDBData } = require('./utils');


let serverStorage;

const server = createServer(async (req, res) => {
    
    switch (true) {
        case (req.url == '/' && req.method == 'GET') :
            getToHome(req, res);
            break;
        case (req.url == '/post' && req.method == 'POST') :
            serverStorage = writeToDB(req, res);
            break;
        case (req.url == '/get' && req.method == 'GET') :
            readDatafromDB(req, res, serverStorage);
            break;
        case (req.url == '/post' && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFileSync(join(__dirname, './Views/output.html')));
            break;
        case (req.url == '/submit' && req.method == 'POST') :
            let data = await postDBData(req)
            console.log(data)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
            break;
        case (req.url.indexOf('init.css') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(readFileSync(join(__dirname, './Public/CSS/init.css')));
            break;
        case (req.url.indexOf('init.js') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(readFileSync(join(__dirname, './Public/JS/init.js')));
            break;
        case (req.url.indexOf('search.png') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(join(__dirname, './Public/Assets/search.png'));
            break;
        default : 
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFileSync(join(__dirname, './Views/error.html')));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));