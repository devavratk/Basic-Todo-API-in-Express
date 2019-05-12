/* 
    File name: server.js
    Language: JavaScript
    Author: Devavrat Kalam
*/

// Getting required modules
const http = require('http');
const express = require('express');
const app = express();
const itemRouter = require('./routes/items');

// Using json middlewear for json body parser
app.use(express.json());
// Using created router
app.use('/items', itemRouter);

app.use('/', (req, res, next) => {
    res.send('Todo API works!!');
});

// Creating server
const server = http.createServer(app);

let port = process.env.PORT || 3000;
server.listen(port);
console.log('PORT number being used :', port);