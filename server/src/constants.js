require('dotenv').config();
const ServerApiVersion = require('mongodb');
const CONNECT_ERROR_500 = 'Sorry, we have a connection problems , please try again later';
const CONNECT_SUCCESS_MSG = `Connected to dtb : ${Date.now()}`;
const CONNECT_STATUS_STABLE = `Connection stable : ${Date.now()}`;
const CONNECTION_URI = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.lwsr8q0.mongodb.net/?retryWrites=true&w=majority`;

// ------------- SETTINGS -----------//


const SESSION_SETTINGS = {
    secret: 'some secret',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: false
}

const MONGO_CLIENT_SETTINGS =
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
}


module.exports = {
    CONNECT_ERROR_500,
    CONNECT_SUCCESS_MSG,
    CONNECT_STATUS_STABLE,
    CONNECTION_URI,
    SESSION_SETTINGS,
    MONGO_CLIENT_SETTINGS
}