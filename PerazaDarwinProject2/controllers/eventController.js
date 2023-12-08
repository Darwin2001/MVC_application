const model = require('../models/event');
const User = require('../models/user');
const RSVP = require('../models/rsvp');

//Send all user stories to the page
exports.index = (req, res) => {
    let id = req.session.user;
    User.findById(id)
        .then(user => {
            model.find()
                .then(events => res.render('./events/index', { events, user }))
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

//Send the details of an identified event
exports.show = (req, res, next) => {
    let id = req.params.id;
    let userId = req.session.user;
    User.findById(userId)
        .then(user => {
            if (user) {
                model.findById(id)
                    .then(event => {
                        if (event) {
                            return res.render('./events/show', { event, user });
                        }
                        else {
                            let err = new Error('Cannot find a story with id  ' + id);
                            err.status = 404;
                            next(err);
                        }
                    })
            }
            else {
                model.findById(id)
                    .then(event => {
                        if (event) {
                            return res.render('./events/show', { event });
                        }
                        else {
                            let err = new Error('Cannot find a story with id  ' + id);
                            err.status = 404;
                            next(err);
                        }
                    })
            }
        })
        .catch(err => next(err));
};

exports.newEvent = (req, res) => {
    let id = req.session.user;
    User.findById(id)
        .then(user => {
            res.render('events/newEvent', { user });
        })
        .catch(err => next(err));
};

//This one creates a new story from inputted fields
exports.create = (req, res, next) => {
    //res.send("created a new story.");
    let id = req.session.user;
    let event = new model(req.body);
    event.author = id;
    User.findById(id)
        .then(user => {
            if (user) {
                event.host_name = user.firstName + " " + user.lastName;
                event.rsvps = 0;
                event.save()
                    .then(event => {
                        req.flash('success', 'Successfully created a new Event!');
                        res.redirect('/events')
                    })
                    .catch(err => {
                        if (err.name === 'ValidationError') {
                            err.status = 400;
                        }
                        next(err);
                    });
            }
            else {
                let err = new Error('Cannot find user with id  ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

//edit page
exports.edit = (req, res) => {
    let id = req.params.id;

    model.findById(id)
        .then(event => {
            if (event) {
                return res.render('./events/edit', { event });
            }
            else {
                let err = new Error("Cannont find a story with id ' " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, { useFindandModify: false })
        .then(event => {
            if (event) {
                RSVP.deleteMany({event_id: id})
                .then(  function(){
                    console.log("Data deleted");
                }).catch(function(error){
                 console.log('error'); 
                });
                req.flash('success', 'Successfully deleted an event');
                res.redirect('/events');
            }
            else {
                let err = new Error('Cannot find a story with id ' + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, { useFindandModify: false, runValidators: true })
        .then(event => {
            if (event) {
                req.flash('success', 'Successfully edited an Event!');
                res.redirect('/events/' + id);
            }
            else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === "ValidationError")
                err.status = 400;
            next(err);
        });
};

exports.updateRsvp = (req, res, next) => {
    let user_id = req.session.user;
    let event_id = req.params.id;
    let response = req.body['rsvp_answer'];
    let status = null;


    if (response == "yes") {
        status= 'yes';
        model.findById(event_id)
            .then(event => {
                req.flash('success', "Succesfully RSVPed!");
                res.redirect('/events/' + event_id);
            })

    }
    else if (response == "maybe") {
        status = 'maybe';
        model.findById(event_id)
            .then(event => {
                req.flash('success', "Succesfully Maybe'd!");
                res.redirect('/events/' + event_id);
            })
    }

    else {
        status = 'no';
        model.findById(event_id)
        .then(event => {
            req.flash('success', "Succesfully No'd!");
            res.redirect('/events/' + event_id);
        })
    }

    const filter = {user_id : user_id, event_id: event_id};
    const update = {status: status};


    RSVP.findOneAndUpdate(filter, update, {upsert: true})
    .then(result =>{
        if(( result == null ||result.status == 'no' || result.status == 'maybe') && status == "yes"){
            model.findById(event_id)
            .then(event => {
                event.rsvps +=1;
                event.save();
            });
        }
        else if(result == null && (status == 'maybe' || status == 'no')){
            //Do nothing to RSVP count
        }
        else if( result.status == 'yes' && (status == 'maybe' || status == 'no') ){ 
            model.findById(event_id)
            .then(event => {
                event.rsvps = event.rsvps -= 1;
                event.save();
            });
        }
    });

    

}


