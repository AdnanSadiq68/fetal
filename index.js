require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => console.log("Error connecting to database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/register", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var phone = req.body.phone;
    var lmpDate = req.body.lmpDate;

    var data = {
        "name": name,
        "age": age,
        "phone": phone,
        "lmpDate": lmpDate
    };
    
    db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('register_successful.html');
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });

    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
