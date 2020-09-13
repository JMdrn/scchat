const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const fs = require('fs');
const authRoutes = require('./routes/authroutes');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { dbURI } = require('./secretconfig');


//db
//const dbURI = mongoConfig.dbURI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => console.log('connected to db.'))
.then (() =>  app.listen(3000, () => console.log('listening on 3k')))
.catch(err => console.log(err));



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());



// const txt = fs.readFileSync('img.txt');

app.use(authRoutes);

app.get('/', (req, res) => {
    res.render('front')
})

app.get('/login', (req, res) => {
    res.render('login')
})