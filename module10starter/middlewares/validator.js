const { isValidObjectId } = require("mongoose");

exports.validateId = (req,res,next) =>{
    let id = req.params.id;
    if(isValidObjectId(id)){
        return next();
    }
    else{
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
};