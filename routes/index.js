const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const os = require('os');
const bodyParser = require('body-parser');

// CSV stuff
const parser = require('csv-parser');
const writer = require('csv-writer').createObjectCsvWriter;

// SQL stuff

const connect = require('../config/sqlConfig.js');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// this block is testing reading and writing of the CSV file
// it successfully generates a .csv and it's available for download, or stores it in a local file

// this entire app could be wrapped in Electron, and then run as a desktop app at which point the .csv file can be saved anywhere with the os package
const csvWriter = writer({
    path: path.join(__dirname, "../output/reorder.csv"),

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

csvWriter.writeRecords(data).then(() => console.log('wrote file'));

router.get("/", (req, res) => {
    res.render("order");
})

router.get("/getParts", (req, res) => {
    console.log('at get parts route');

    connect.getConnection((err, connection) => {
        if (err) { throw err.message }

        let query = "SELECT * FROM Parts_Inventory";

        connect.query(query, (err, rows) => {
            connection.release();

            console.log(rows);
            res.json(rows);
        })
    })
})

router.get("/getcustomers", (req, res) => {
    connect.getConnection((err, connection) => {
        if (err) { throw err.message }

        let query = "SELECT * FROM Customers";

        connect.query(query, (err, rows) => {
            connection.release();

            console.log(rows);
            res.json(rows);
        })
    })
})

router.post("/addCustomer", (req, res) => {
    
    // do a sql push here, write query and add name
})

// this route originally worked with just the .csv file -> read the stream, parsed the data and sent back the parts

// router.get("/", (req, res, next) => {
//     res.locals.parts = [];

//     fs.createReadStream('./assets/test.csv')
//         .pipe(parser())
//         .on('data', (row) => {
//             res.locals.parts.push(row);
//         })
//         .on('end', () => {
//             console.log('CSV file successfully processed');
//             next();
//         });

          
// }, (req, res) => {
//     console.log("hit the next part of the route");
//     res.render("index", { data: res.locals.parts});
// })

router.get("/download", (req, res) => {
    res.download("./output/reorder.csv");
})

module.exports = router;