const express = require('express');
const mongoose = require('mongoose');

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

app.listen(ports.server, () => {
    console.log(`Running on PORT ${ports.server}`);
});
