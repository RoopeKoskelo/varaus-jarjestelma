const mongoose = require('mongoose')
const { Schema } = mongoose;

const reservationSchema = new Schema({
    event_id: String,
    title: String,
    start: Date,
    end: Date,
});

const Reservation = mongoose.model('Reservation', reservationSchema, 'reservations');

module.exports = { Reservation }