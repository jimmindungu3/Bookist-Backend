const express = require("express");
const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel"); // Assuming you have an Event model
const bookingRouter = express.Router();

// POST route to handle booking
bookingRouter.post("/api/booking/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.body;

    // Find the event and check if there's capacity
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.capacity <= 0) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    // Create new booking
    const newBooking = new Booking({
      eventId,
      user,
    });

    // Save the booking and update event capacity
    await Promise.all([
      newBooking.save(),
      Event.findByIdAndUpdate(eventId, { $inc: { capacity: -1 } })
    ]);

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
});

// GET route to retrieve all users who booked a particular event
bookingRouter.get("/api/event/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId; // Changed from req.params.id to req.params.eventId

    const bookings = await Booking.find({ eventId });

    const users = bookings.map((booking) => booking.user);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookings", error: error.message });
  }
});

module.exports = bookingRouter;