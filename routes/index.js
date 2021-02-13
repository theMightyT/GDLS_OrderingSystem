const express = require('express');
const router = express.Router();
const parser = require('csv-parser');
const fs = require('fs');

let store = [];

router.get("/", (req, res) => {
    console.log('hit the main route');
    testFunc();

    res.render("index", {message: "hello from handlebars"});
})

router.get("/csv", (req, res) => {
    let parts = [];

    fs.createReadStream('./assets/test.csv')
        .pipe(parser())
        .on('data', (row) => {
            parts.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            res.json(parts);
    });    
})

module.exports = router;