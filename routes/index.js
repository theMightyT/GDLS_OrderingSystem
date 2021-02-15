const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// CSV stuff
const parser = require('csv-parser');
const writer = require('csv-writer').createObjectCsvWriter;

// SQL stuff

const connect = require('../config/sqlConfig.js');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// test for homedir
// const os = require('os');

let store = [];

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
    
    // do a sql push here
})

// router.get("/", (req, res) => {
//     res.render("index");
// })

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