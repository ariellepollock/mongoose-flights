const mongoose = require('mongoose')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    destination: {
        type: String, 
        enum: ['Denver', 'Chicago', 'Austin', 'Dallas', 'Los Angeles', 'San Francisco']
    },
    airport: {
        type: String, 
        enum: ['DEN', 'ORD', 'AUS', 'DFW', 'LAX', 'SAN']
    },
    arrival: {
        type: Date,
    }
}, {
    timestamp: true
})

const flightSchema = new Schema({
    airline: {
        type: String, 
        enum: ['American', 'Southwest', 'United', 'Alaska', 'Delta', 'Spirit']
    },
    airport: {
        type: String, 
        enum: ['DEN', 'ORD', 'AUS', 'DFW', 'LAX', 'SAN']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
    },
    destinations: [destinationSchema],
    vouchers: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Flight', flightSchema)