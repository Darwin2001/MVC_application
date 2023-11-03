const model = require('../models/event');

//Send all user stories to the page
exports.index = (req, res) => {
    let events = model.find();
    res.render('./events/index', { events });
};

//Send the details of an identified event
exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render("./events/show", { event });
    }
    else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
    }
};

exports.newEvent = (req, res) => {
    res.render('events/newEvent');
};

//This one creates a new story from inputted fields
exports.create = (req, res) => {
    //res.send("created a new story.");

    let event = req.body;
    model.save(event);
    res.redirect('/events');
};

//edit page
exports.edit = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render("./events/edit", { event });
    }
    else {
        let err = new Error("Cannot find a event with id " + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/events');
    }
    else {
        let err = new Error("Cannot find an event with id " + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res) => {
    let event = req.body;
    let id = req.params.id;

    if (model.updateById(id, event)) {
        res.redirect('/events/' + id);
    }
    else {
        let err = new Error("Cannot find an event with id " + id);
        err.status = 404;
        next(err);
    }

};