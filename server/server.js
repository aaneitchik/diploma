const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const ports = require('../config/ports');

const database = require('../config/database');

mongoose.connect(database.url);
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	session({
		secret: 'mybsulibappsecret',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(flash());

const fileRouter = require('./routes/file.routes');
const authRouter = require('./routes/auth.routes');

app.use('/api/files', fileRouter);
app.use('/api', authRouter);

app.listen(ports.server, () => {
	console.log(`Running on PORT ${ports.server}`);
});
