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
const userController = require('./controllers/user');
// const issueController = require('./controllers/issues');


//middleware setup
app.use(logger);
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', userController);
app.use('/uploads', express.static('uploads'));
// app.use('/api/issues', issueController);


//access html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));

}
);


//defaults routes
// app.all(
//     '/',
//     function (req, res) {
//         return res.json({
//             status: true,
//             message: 'demo workinggg...'
//         });
//     }
// );
app.get('/', function (req, res) {
    res.send('hello demo page')
})

app.get('/api/members', (req, res) => res.json(members));//get all members



app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `no member not found in that id ${req.params.id}` });
    }
});


//start server
// const PORT = process.env.PORT || 5000;
app.listen(port, () => console.log(`server start ${port}`));
