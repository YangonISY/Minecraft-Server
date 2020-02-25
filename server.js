if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
const db = mongoose.connection;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true });
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to database'));

//Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(process.env.PORT || 3000);