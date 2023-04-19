const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const { Reservation } = require('./schema/schema')

require('dotenv').config()
const source = process.env.ATLAS_CONNECTION

app.use(cors())
app.use(express.json())


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
    res.send("yes")
});

let reserve1 = new Reservation({event_id: 2, title: 'koppi2', start: Date.now(), end: Date.now()});

reserve1.save()
.then(function (Reservation){
    console.log(Reservation.title + " reserved.");
})
.catch(function (err){
    console.log(err);
})
