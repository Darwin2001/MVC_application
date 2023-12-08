const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const date = new Date();

const genres = ["Pokemon-Go", "SSBU", "CD", "PkmnVGC", "Minecraft"]; 
const statuses = ["yes","no","maybe"];

exports.validateSignUp = [body('firstName, "First Name cannot be empty').notEmpty().trim().escape(),
body('lastName, "Last Name cannot be empty').notEmpty().trim().escape(),
body('email', "Email must be an email address").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be between 8 and 64 characters long").isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', "Email must be an email address").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be between 8 and 64 characters long").isLength({min: 8, max: 64})];

exports.validateEvent = [body('title', "Title cannot be Empty!").notEmpty().trim().escape(),
body('category', "The category must be one of the one's in App").isIn(genres).trim().escape(),
body('location', "Location must not be empty").notEmpty().trim().escape(),
body('details', "Details must be provided").notEmpty().trim().escape(),
body('start_date', "Start Date must be after today's current time").notEmpty().isISO8601().isAfter(date.toISOString()).trim().escape(),
body('end_date', "End Date must be after start_date").notEmpty().isISO8601().trim().escape()
];

exports.validateRsvp = [body('status', "Status value can only be yes/no/ or maybe").isIn(statuses).trim().escape()];

exports.validateResult = (req,res,next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else{
        return next();
    }
}