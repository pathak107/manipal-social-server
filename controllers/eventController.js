//importing models
const Event = require("../models/events");
const UpcomingEvent = require('../models/upcomingEvents');

exports.events_get_all = (req, res) => {
    //send list of all the events
    console.log("fetching all events");

    Event.find((err, events) => {
        console.log(events);
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
                data: {
                    events:events,
                }
            });
        }
    });
};
exports.upcomingevents_get_all = (req, res) => {
    //send list of all the upcoming events
    console.log("fetching all upcoming events");
    var currentDate=Date.now();
    UpcomingEvent.find({ when: { $gte: currentDate } }, (err, upcomingEvents) => {
        console.log(upcomingEvents);
        if (err) {
            res.json({
                status: "failure",
                message: "Some error occurred in retrieving events from database",
                error: err,
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Retrived all the upcoming events",
                data:{
                    upcomingEvents:upcomingEvents,
                } ,
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
                newEvent: newEvent,
            });
        }
    });
};

exports.upcomingevent_create = (req, res) => {
    const upcomingEvent = new UpcomingEvent({
        name: req.body.name,
        when: Date.parse(req.body.when),
        what: req.body.what,
        contacts: [{ contactName: req.body.contactName1, number: req.body.contactNum1 },
        { contactName: req.body.contactName2, number: req.body.contactNum2 }],
        where: req.body.where,
        organizer: req.body.organizer,
        imageUrl: req.body.imageUrl,
    });

    upcomingEvent.save((err, newUpcomingEvent) => {
        if (err) {
            res.json({
                status: "failure",
                message: "Some error occurred in creating the upcoming event",
                error: err,
            });
        } else {
            console.log(newUpcomingEvent);
            res.status(200).json({
                status: "success",
                message: "new Upcoming Event created",
                newUpcomingEvent: newUpcomingEvent,
            });
        }
    });
};

exports.event_delete = (req, res) => {
    const eventID = req.params.eventID;
    Event.findByIdAndDelete(eventID, (err, event) => {
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

exports.upcomingevent_delete = (req, res) => {
    const upcomingEventID = req.params.upcomingEventID;
    UpcomingEvent.findByIdAndDelete(upcomingEventID, (err, upcomingevent) => {
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
                deletedEvent: upcomingevent,
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
        event.name = req.body.name;
        event.description = req.body.description;
        event.organizer = req.body.organizer;
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

exports.upcomingevent_update = (req, res) => {
    const upcomingEventID = req.params.upcomingEventID;
    UpcomingEvent.findById(upcomingEventID, (err, upcomingEvent) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in updating the event",
                error: err,
            });
        }

        //updating all the values sent
        upcomingEvent.name = req.body.name;
        upcomingEvent.when = Date.parse(req.body.when);
        upcomingEvent.what = req.body.what;
        upcomingEvent.contacts = [{ contactName: req.body.contactName1, number: req.body.contactNum1 },
        { contactName: req.body.contactName2, number: req.body.contactNum2 }];
        upcomingEvent.where = req.body.where;
        upcomingEvent.organizer = req.body.organizer;
        upcomingEvent.imageUrl = req.body.imageUrl;


        upcomingEvent.save((err, upcomingevent) => {
            if (err) {
                res.json({
                    status: "failure",
                    message: "Some error occurred in updating the event",
                    error: err,
                });
            } else {
                console.log(upcomingevent);
                res.status(200).json({
                    status: "success",
                    message: "upcoming event updated",
                    updatedEvent: upcomingevent,
                });
            }
        });
    });
};