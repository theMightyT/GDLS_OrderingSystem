const express = require('express');
const router = express.Router();
const path = require('path');
const parser = require('csv-parser');
const writer = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

// test for homedir
const os = require('os');

let store = [];

const csvWriter = writer({
    path: path.join(os.homedir(), "/Documents/reorder.csv"),

    header: [
        {id: 'name', title: 'Name'},
        {id: 'surname', title: 'Surname'},
        {id: 'age', title: 'Age'}
    ]
});

const data = [
    {
        name: "Trevor",
        surname: "VR",
        age: 49
    },
    {
        name: "Madelaine",
        surname: "VR",
        age: 14
    },
    {
        name: "Serena",
        surname: "VR",
        age: 10
    }
];

csvWriter.writeRecords(data).then(() => console.log('wrote file to Documents'));

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