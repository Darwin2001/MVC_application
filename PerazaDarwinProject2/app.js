//package requirements
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');




//Starting app
const app = express();

//Config app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect('mongodb+srv://demo:demo123@cluster0.bvqypel.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    //start application
    app.listen(port,host,()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));


//Mounting some middleware

app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/mvc_app'}),
        cookie: {maxAge: 60*60*1000}
        })
);

app.use(flash());

app.use((req,res,next) =>{
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Routes
app.get("/", (req, res)=>{
    res.render('index');
});

app.use('/events', eventRoutes);
app.use('/user', userRoutes);


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

