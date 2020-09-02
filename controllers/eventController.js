//importing models
const Event = require("../models/events");

exports.events_get_all = (req, res) => {
  //send list of all the places
  console.log("fetching all events");

  Event.find((err, events) => {
    console.log(places);
    if (err) {
      res.json({
        status: "failure",
        message: "Some error occurred in retrieving events from database",
        error: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Retrived all the events",
        events: events,
      });
    }
  });
};

exports.event_create = (req, res) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    organizer: req.body.organizer,
  });

  event.save((err, newEvent) => {
    if (err) {
      res.json({
        status: "failure",
        message: "Some error occurred in creating the event",
        error: err,
      });
    } else {
      console.log(newEvent);
      res.status(200).json({
        status: "success",
        message: "event created",
        newPlace: newEvent,
      });
    }
  });
};

exports.event_delete = (req, res) => {
  const eventID = req.params.eventID;
  event.findByIdAndDelete(eventID, (err, event) => {
    if (err) {
      res.json({
        status: "failure",
        message: "Some error occurred in deleting the event",
        error: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Succesfully deleted event",
        deletedEvent: event,
      });
    }
  });
};

exports.event_update = (req, res) => {
  const eventID = req.params.eventID;
  Event.findById(eventID, (err, event) => {
    if (err) {
      return res.json({
        status: "failure",
        message: "Some error occurred in updating the event",
        error: err,
      });
    }

    //updating all the values sent
    (event.name = req.body.name),
      (event.description = req.body.description),
      (event.organizer = req.body.organizer),
      event.save((err, updatedEvent) => {
        if (err) {
          res.json({
            status: "failure",
            message: "Some error occurred in creating the event",
            error: err,
          });
        } else {
          console.log(updatedEvent);
          res.status(200).json({
            status: "success",
            message: "event updated",
            updatedEvent: updatedEvent,
          });
        }
      });
  });
};
