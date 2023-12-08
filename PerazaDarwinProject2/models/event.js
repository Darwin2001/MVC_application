const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    author:{type:String, required:[true, 'Author must be assigned']},
    title: {type: String, required: [true, "title is required"]},
    category: {type:String, required:[true, "Category is required"]},
    host_name: {type: String, required:[true, 'name is required']},
    start_date: {type:String, required:[true, 'start date is required']},
    end_date: {type:String, required:[true, 'end date is required']},
    location: {type: String, required:[true, 'location is required']},
    details: {type: String, required:[true, 'details are required'], minLength:[12, 'The content should have at least 12 characters']},
    image: {type:String}

});

module.exports = mongoose.model('Event', eventSchema);






exports.find = () => events;
exports.findById = id => events.find(event => event.id == id);
exports.save = function(event){
    event.id = uuidv4();
    events.push(event);
}
exports.updateById  = function(id, newEvent){
    let event = events.find(event => event.id == id);
    if(event){
        event.title = newEvent.title;
        event.content = newEvent.content;
        return true;
    }
    else{
        return false;
    }
}
exports.deleteById = function(id){
    let index = events.findIndex(event => event.id === id);
    if(index !== -1){
        events.splice(index, 1);
        return true;
    }
    else{
        return false;
    }
}