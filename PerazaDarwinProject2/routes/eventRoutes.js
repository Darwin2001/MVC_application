const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

//Retrieve the index
router.get("/", controller.index);

//Sending the form to create a new Event
router.get('/newEvent' , controller.newEvent);

//Redirects to the index after creating new post
router.post('/', controller.create);

//send the details of an identified event 
router.get("/:id", controller.show);

//Getting the id and details of the post you're about to edit. 
router.get("/:id/edit", controller.edit);

//Put the updated information into the story object
router.put("/:id", controller.update);

//Delete the story by id
router.delete("/:id", controller.delete);




module.exports = router;