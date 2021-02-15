const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cron = require('node-cron');

const port = process.env.PORT || 3000;

const server = express();

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.use(express.static('public'));
server.use("/", require('./routes/index'));

server.listen(port, () => {
    console.log(`app is running on ${port}`);
})

// schedule cron job
cron.schedule('3 5 * * *', () => {
    console.log('runs every day at 5AM');

    // import and parse CSV file here, compare against existing data
    // the CSV reader / writer live in the route file, so this would likely have to  move
    // cron job is just here for reference
    console.log('parse .csv, update datastore');
});