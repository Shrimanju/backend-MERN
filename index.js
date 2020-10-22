//init code
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');//use current port number and system time in console
const members = require('./Members');//middleware function
const app = express();
const port = process.env.PORT;
const database = require('./database');
const issueController = require('./controllers/issues');


//middleware setup
app.use(logger);
app.use(morgan('dev'));
app.use(cors());
app.use('/api/issues', issueController);






app.listen(port, () => console.log(`server start ${port}`));
