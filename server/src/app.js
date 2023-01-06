const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {MongoClient, ServerApiVersion} = require('mongodb');
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
let db;

async function run_db() {
    try {
        db = await new MongoClient(CONNECTION_URI, MONGO_CLIENT_SETTINGS).connect()
        return db;
    } catch (err) {
        return db;
        process.exit(1);
    }
}

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    if (db === undefined) {
        const client = run_db().then((data) => {
                if (data === undefined) {
                    res.status(500).json({
                        msg: CONNECT_ERROR_500
                    })
                } else {
                    console.log(CONNECT_SUCCESS_MSG)
                    next();
                }
            }
        )
    } else {
        console.log(CONNECT_STATUS_STABLE)
        next();
    }
})

app.use('/user', userRoute)
app.post('/login', (req, res) => {
    userController.loginUser(req, res, db, store)
})
module.exports = {app};

