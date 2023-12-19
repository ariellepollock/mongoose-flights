const Ticket = require('../models/ticket')
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToVouchers
};

async function addToVouchers(req, res) {
    const flight = await Flight.findById(req.params.id);
    // The voucher array holds the ticket's ObjectId (referencing)
    flight.vouchers.push(req.body.ticketId);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
    const flightId = req.params.id; // Extract the flight ID from the request params
    res.render('tickets/new', { flightId }); // Pass the flightId to the new ticket form
}

async function create(req, res) {
    try {
        const ticket = await Ticket.create(req.body);
        const flightId = req.params.id;

        const flight = await Flight.findById(flightId);
        flight.tickets.push(ticket._id);
        await flight.save();

        // Fetch the flight details to display flight number in the ticket's view
        const associatedFlight = await Flight.findById(flightId);

        res.render('tickets/new', { ticket, flight: associatedFlight });
    } catch (err) {
        console.log(err);
        res.render('error');
    }
}