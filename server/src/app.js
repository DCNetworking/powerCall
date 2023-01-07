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
    SESSION_SETTINGS, MONGO_CLIENT_SETTINGS, CONNECTION_URI, CONNECT_ERROR_500, CONNECT_SUCCESS_MSG,
    CONNECT_STATUS_STABLE
} = require("./constants");

app.use(session({
    ...SESSION_SETTINGS,
    store
}));
process.on("uncaughtException", (err) => {
    console.log("process err", err);
    process.exit(1);
})

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute)
app.post('/login', (req, res) => {
    userController.loginUser(req, res, store)
})

module.exports = { app };



