const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const { Reservation } = require('./schema/schema')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()
const source = process.env.ATLAS_CONNECTION

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(source)

const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})

app.get("/", function (req, res) {
    res.send("valid JSON")
});

app.get("/reservations", async function (req, res) {
    let data = await Reservation.find({},{_id:0,})
    res.send(data)
});

// saving new reservations / updating existing reservations starts here

/* create new reservation */

function saveReservation(data){
    let newreserve = new Reservation(data);
    newreserve.save()
    .then(function (Reservation){
        console.log(Reservation.title + " reserved.");
    })
    .catch(function (err){
        console.log(err);
    })
};

app.post("/reservations", async function (req, res) {
    let data = req.body;
    data.event_id = uuidv4()
    console.log('data received: ' + JSON.stringify(data))
    saveReservation(data);
})

/* update existing reservation */

function updateReservation(data){
    let reserve = Reservation(data);
    reserve.save()
    .then(function (Reservation){
        console.log(Reservation.title + " reserved.");
    })
    .catch(function (err){
        console.log(err);
    })
};

app.put("/reservations", async function (req, res) {
    let data = req.body;
    data.event_id = uuidv4()
    console.log('data received: ' + JSON.stringify(data))
    updateReservation(data);
})
/*
let reserve1 = new Reservation({event_id: 1, title: 'koppi1', start: new Date(Date.now()), end: new Date(Date.now())});

function saveReservation(){
    reserve1.save()
    .then(function (Reservation){
        console.log(Reservation.title + " reserved.");
    })
    .catch(function (err){
        console.log(err);
    })
};
saveReservation();
*/
