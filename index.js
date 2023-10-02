const express = require('express');
const {
    engine
} = require('express-handlebars');
const handlebars = require('handlebars');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const router = require('./routes/router');
const sequelize = require('./config/database');

sequelize.sync();

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('errors');
    res.locals.session = req.session;
    next();
});

app.engine('.hbs', engine({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});