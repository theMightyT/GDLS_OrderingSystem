const express = require('express');
const path = require('path');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const server = express();

global.testFunc = () => {
    console.log('this is a test function');
}

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.use(express.static('public'));
server.use("/", require('./routes/index'));

server.listen(port, () => {
    console.log(`app is running on ${port}`);
})

testFunc();