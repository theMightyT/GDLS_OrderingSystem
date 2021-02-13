const express = require('express');
const router = express.Router();
const parser = require('csv-parser');
const fs = require('fs');

let store = [];

router.get("/", (req, res) => {
    console.log('hit the main route');

    res.render("index", {message: "hello from handlebars"});
})

router.get("/csv", (req, res) => {
    fs.createReadStream('./assets/test.csv')
        .pipe(parser())
        .on('data', (row) => {
            console.log(row);
            store.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log(store);

            res.json(store);
    });

    
})

module.exports = router;