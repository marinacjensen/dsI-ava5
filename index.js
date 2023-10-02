const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const handlebars_mod = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const appRoutes = require('./routes/approutes');
const session = require('express-session');
const flash = require('connect-flash');

sequelize.sync();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('errors');
    res.locals.session = req.session;
    next();
});

// Handlebars configuration
const helpers = require('./helpers/helpers'); // Import the helpers
const { sequelize } = require('./config/database');
app.engine('handlebars', handlebars.engine({
    defaultLayout: false,
    handlebars: allowInsecurePrototypeAccess(handlebars_mod),
    extname: '.handlebars',
    helpers: helpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

// Sync the models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced sucessfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

// Routes
app.use(appRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});