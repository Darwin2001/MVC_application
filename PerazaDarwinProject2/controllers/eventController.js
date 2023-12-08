const model = require('../models/event');

//Send all user stories to the page
exports.index = (req, res) => {
    model.find()
    .then(events=>res.render('./events/index', {events}))
    .catch(err=>next(err));
};

//Send the details of an identified event
exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
    .then(event=>{
        if(event){
            return res.render('./events/show', {event});
        }
        else{
            let err = new Error('Cannot find a story with id  ' + id);
            err.status = 404;
            next(err);
        }
    })
};

exports.newEvent = (req, res) => {
    res.render('events/newEvent');
};

//This one creates a new story from inputted fields
exports.create = (req, res, next) => {
    //res.send("created a new story.");

    let event = new model(req.body);
    event.author = req.session.user;
    event.save()
    .then(event=>res.redirect('/events'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

//edit page
exports.edit = (req, res) => {
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        if(event){
            return res.render('./events/edit', {event});
        }
        else{
            let err = new Error("Cannont find a story with id ' " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindandModify: false})
    .then(event=>{
        if(event){
            res.redirect('/events');
        }
        else{
            let err= new Error('Cannot find a story with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res) => {
   let event = req.body;
   let id = req.params.id;

   model.findByIdAndUpdate(id, event, {useFindandModify: false, runValidators: true})
   .then(event=>{
    if(event){
        res.redirect('/events/'+id);
    }
    else{
        let err =  new Error("Cannot find a story with id " + id);
        err.status = 404;
        next(err);
    }
   })
   .catch(err=>{
    if(err.name === "ValidationError")
    err.status = 400;
    next(err);
   });
};