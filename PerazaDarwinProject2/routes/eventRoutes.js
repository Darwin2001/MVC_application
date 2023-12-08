const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isAuthor} = require("../middlewares/auth");
const router = express.Router();

//Retrieve the index
router.get("/", controller.index);

//Sending the form to create a new Event
router.get('/newEvent' ,isLoggedIn,  controller.newEvent);

//Redirects to the index after creating new post
router.post('/',isLoggedIn, controller.create);

//send the details of an identified event 
router.get("/:id", controller.show);

//Getting the id and details of the post you're about to edit. 
router.get("/:id/edit", isLoggedIn, isAuthor, controller.edit);

//Put the updated information into the story object
router.put("/:id", isLoggedIn, isAuthor, controller.update);

//Delete the story by id
router.delete("/:id",isLoggedIn, isAuthor, controller.delete);




module.exports = router;