const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    index,
    show,
    new: newFlight,
    create
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        const tickets = await Ticket.find({ flight: flight._id });

        res.render('flights/show', { flight, tickets });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: '' })
}

async function create(req, res) {
    try {
        await Flight.create(req.body);

        res.redirect('/flights'); 
    } catch (err) {

        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}

