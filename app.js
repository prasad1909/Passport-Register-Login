const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const app=express();
const mongoose=require('mongoose');
const port=process.env.port || 5000;
const flash=require('connect-flash')
const passport=require('passport')
const session=require('express-session')

require('./config/passport')(passport);

const db='mongodb+srv://prasad19:Praraj19@cluster0.6pjqd.mongodb.net/MyData?retryWrites=true&w=majority';

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=> console.log("db connected..."))
    .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended:false}));

//Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


//pasport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect-flash
app.use(flash());

//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/user'));

app.listen(port, console.log(`app started on port ${port}`));