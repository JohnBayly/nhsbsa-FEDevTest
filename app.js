const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();

// Set up Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Error handling
app.use((req, res, next) => {
    res.status(404).render('error.njk', { message: 'Page not found' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});