//package requirements
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const eventRoutes = require('./routes/eventRoutes');
const mongoose = require('mongoose');


//Starting app
const app = express();

//Config app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/posts'
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url)
.then(()=>{
    //starting the server
app.listen(port, host, ()=>{
    console.log("Server is running on port ", port);
});

})
.catch(err=>console.log(err.message));


//Mounting some middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Routes
app.get("/", (req, res)=>{
    res.render('index');
});

app.use('/events', eventRoutes);


//Error Handling
app.use((req,res, next)=>{
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

