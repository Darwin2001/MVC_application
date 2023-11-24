const Story = require('../models/story');

//Checks to see if the user is logged in
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    else {
        req.flash("error", "you are logged in already");
        return res.redirect("/users/profile");
    }
}

//Checks to see if user is authenticated 
exports.isLoggedIn = (req,res,next)=>{
    if (req.session.user) {
        return next();
    }
    else {
        req.flash("error", "you need to login first");
        return res.redirect("/users/login");
    }
}

//Check if user is author of story 

exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    Story.findById(id)
    .then(story=>{
        if(story){
            if(story.author == req.session.user){
                return next();
            }
            else{
                let err = new Error("Unathorized access to the resource");
                err.status=404;
                return next(err);
            }
        }
        else{
            let err = new Error('Cannot find a story with id '+ id);
            err.status = 400;
            return next(err);
        }
    })
    .catch(err=>next(err));
};