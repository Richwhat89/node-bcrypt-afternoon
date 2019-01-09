const {json} = require('body-parser');
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authcontroller');
const treasureCtrl = require('./controllers/treasurecontroller');
const auth = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();

const {CONNECTION_STRING, SESSION_SECRET}=process.env;

const PORT = 4000;

app.use(json());

massive(CONNECTION_STRING).then(db=>{app.set('db',db);
console.log('db connected');
});

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', authOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', authOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))