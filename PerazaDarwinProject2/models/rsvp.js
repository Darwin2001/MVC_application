const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    //RSVP will contain 3 fields event id, user id, and status 
    event_id: {type: String, required: [true, 'Event Id is required']},
    user_id: {type: String, required: [true, 'User Id is required']},
    status: {type: String, required: [true, 'Status is required']}
});

module.exports = mongoose.model("RSVP", rsvpSchema);