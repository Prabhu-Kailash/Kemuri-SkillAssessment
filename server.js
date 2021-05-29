const { createServer } = require('http');
const { readFileSync } = require('fs');
const { join } = require('path');
const { writeToDB, readDatafromDB, getToHome, form, readDatafromForm } = require('./Controllers/stock_controllers');
const PORT = process.env.PORT || 5000;

// Server storage, UserInfo
let serverStorage, userForm;

const server = createServer(async (req, res) => {
    // Routes
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
        case (req.url == '/submit' && req.method == 'POST') :
            userForm = await form(req, res, serverStorage);
            break;
        case (req.url == '/getData' && req.method == 'GET') :
            readDatafromForm(req, res, userForm);
            break;
        case (req.url == '/post' && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFileSync(join(__dirname, './Views/output.html')));
            break;
        case (req.url == '/submit' && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFileSync(join(__dirname, './Views/results.html')));
            break;
        case (req.url.indexOf('init.css') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(readFileSync(join(__dirname, './Public/CSS/init.css')));
            break;
        case (req.url.indexOf('init.js') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(readFileSync(join(__dirname, './Public/JS/init.js')));
            break;
        case (req.url.indexOf('output.js') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(readFileSync(join(__dirname, './Public/JS/output.js')));
            break;
        case (req.url.indexOf('results.js') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(readFileSync(join(__dirname, './Public/JS/results.js')));
            break;
        case (req.url.indexOf('frontendUtil.js') != -1 && req.method == 'GET') :
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(readFileSync(join(__dirname, './Public/JS/frontendUtil.js')));
            break;
        default : 
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readFileSync(join(__dirname, './Views/error.html')));
    }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
