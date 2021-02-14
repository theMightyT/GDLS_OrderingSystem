const express = require('express');
const router = express.Router();
const parser = require('csv-parser');
const fs = require('fs');

let store = [];

// router.get("/", (req, res) => {
//     res.render("index");
// })

router.get("/", (req, res, next) => {
    res.locals.parts = [];

    fs.createReadStream('./assets/test.csv')
        .pipe(parser())
        .on('data', (row) => {
            res.locals.parts.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            next();
        });

          
}, (req, res) => {
    console.log("hit the next part of the route");
    res.render("index", { data: res.locals.parts});
})

module.exports = router;

// fs.createReadStream('./assets/test.csv')
//     .pipe(parser())
//     .on('data', (row) => {
//         parts.push(row);
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//         res.json(parts);
//     });