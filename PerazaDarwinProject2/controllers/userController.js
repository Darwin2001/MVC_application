const model = require('../models/user');
const Event = require('../models/event');
const RSVP = require('../models/rsvp');

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.create = (req, res, next)=>{
        let user = new model(req.body);
        user.email = user.email.toLowerCase();
    user.save()
    .then(user=> {
        req.flash('success','Successfully created an Account!');
        res.redirect('/user/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/user/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/user/new');
        }
        
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

exports.login = (req, res, next)=>{

    let email = req.body.email;
    if(email){
        email = email.toLowerCase();
    }
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/user/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/user/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({author:id}), RSVP.find({user_id:id}), Event.find()])
    .then(results=>{
        const[user, events, rsvps, eventList] = results;
        res.render('./user/profile', {user, events, rsvps,eventList});
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };