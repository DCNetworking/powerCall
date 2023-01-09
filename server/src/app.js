const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const store = new session.MemoryStore();
const userController = require('./controllers/user.controller');
const userRoute = require('./routes/user.route');
const app = express();
const bcrypt = require('bcrypt');

const {
    SESSION_SETTINGS
} = require("./constants");

app.use(session({
    ...SESSION_SETTINGS,
    store
}));
process.on("uncaughtException", (err) => {
    console.log("process err", err);
    process.exit(1);
})

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Connection stable'
    })
})
app.post('/login', (req, res) => {
    userController.loginUser(req, res, store)
})
app.get('/session', (req, res) => {
    if (store.sessions[req.sessionID] !== undefined)
        return res.status(200).json(JSON.parse(store.sessions[req.sessionID]));
    return res.status(403).json({ message: 'Session does not exist', OK: false })
})


module.exports = { app };



